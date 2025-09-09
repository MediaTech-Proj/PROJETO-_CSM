const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// ------------------------
// ROTAS DE USUÁRIOS
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

// Cadastro de usuário
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

// Login de usuário
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Senha incorreta" });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// rota para pegar dados do usuário logado
app.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
});

// Atualizar dados do usuário
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const dataToUpdate = { name, email };
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      dataToUpdate.password = hash;
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    res.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deletar conta
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
// ROTAS DE CATEGORIAS
// ------------------------
app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

// ------------------------
// ROTAS DE FILMES/SÉRIES (Titles)
// ------------------------
app.get("/titles", async (req, res) => {
  const titles = await prisma.title.findMany({
    include: { category: true },
  });
  res.json(titles);
});

app.post("/titles", async (req, res) => {
  const { title, description, price, categoryId } = req.body;
  try {
    const newTitle = await prisma.title.create({
      data: { title, description, price, categoryId },
    });
    res.json(newTitle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/titles/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price, categoryId } = req.body;
  try {
    const updatedTitle = await prisma.title.update({
      where: { id: Number(id) },
      data: { title, description, price, categoryId },
    });
    res.json(updatedTitle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/titles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.title.delete({ where: { id: Number(id) } });
    res.json({ message: "Title deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ------------------------
// ROTAS DE PEDIDOS (Orders)
// ------------------------
app.post("/orders", async (req, res) => {
  const { userId, items } = req.body; // items = [{ titleId, quantity, price }]
  try {
    // Calcula total
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Cria pedido
    const newOrder = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: items, // cria OrderItems
        },
      },
      include: { items: true },
    });

    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/orders/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      include: { items: { include: { title: true } } },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ------------------------
// INICIAR SERVIDOR
// ------------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
