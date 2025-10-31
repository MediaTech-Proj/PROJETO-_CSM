require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("public/uploads"));

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// ------------------------
// MIDDLEWARES
// ------------------------
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Acesso negado" });
  }
  next();
};

// ------------------------
// ROTAS DE USUÁRIOS (EXISTENTES)
// ------------------------
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email já cadastrado" });
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: hash } });
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Senha incorreta" });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const dataToUpdate = { name, email };
    if (password) dataToUpdate.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    res.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: "Conta deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------------------
// ROTAS DE ADMIN (NOVAS)
// ------------------------
app.get("/admin/users", requireAuth, requireAdmin, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/admin/users", requireAuth, requireAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hash, role: role || "user" },
    });
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/admin/users/:id", requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  const dataToUpdate = { name, email };
  if (password) dataToUpdate.password = await bcrypt.hash(password, 10);
  if (role) dataToUpdate.role = role;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/admin/users/:id", requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------------------
// ROTAS DE CATEGORIAS
// ------------------------
app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

// ------------------------
// ROTAS DE FILMES (MOVIES)
// ------------------------
app.get("/movies", async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/movies/:id", async (req, res) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: Number(req.params.id) },
      include: { category: true },
    });
    if (!movie) return res.status(404).json({ message: "Filme não encontrado" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ------------------------
// ROTAS DE FAVORITOS
// ------------------------

// Adicionar um filme aos favoritos
app.post("/favorites", requireAuth, async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.id;

  try {
    const existing = await prisma.favorite.findUnique({
      where: { userId_movieId: { userId, movieId } },
    });
    if (existing) return res.status(400).json({ message: "Filme já está nos favoritos" });

    const favorite = await prisma.favorite.create({
      data: { userId, movieId },
      include: { movie: true },
    });

    res.json(favorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remover dos favoritos
app.delete("/favorites/:movieId", requireAuth, async (req, res) => {
  const movieId = Number(req.params.movieId);
  const userId = req.user.id;

  try {
    await prisma.favorite.delete({
      where: { userId_movieId: { userId, movieId } },
    });
    res.json({ message: "Removido dos favoritos" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Listar favoritos do usuário logado
app.get("/favorites", requireAuth, async (req, res) => {
  const userId = req.user.id;

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: { movie: true },
    });
    res.json(favorites.map(fav => fav.movie));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ------------------------
// INICIAR SERVIDOR
// ------------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
