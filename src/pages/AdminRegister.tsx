import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AdminRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Você precisa estar logado como admin");

      const res = await fetch("http://localhost:3001/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, role: "admin" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao criar admin");

      setSuccess("Admin criado com sucesso!");
      setForm({ name: "", email: "", password: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Redireciona se não houver token (não logado)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-card">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Cadastro de Admin
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1 text-white">Nome</label>
            <Input
              type="text"
              name="name"
              placeholder="Nome do admin"
              required
              value={form.name}
              onChange={handleChange}
              className="text-white placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-white">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="email@admin.com"
              required
              value={form.email}
              onChange={handleChange}
              className="text-white placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-white">Senha</label>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={handleChange}
              className="text-white placeholder:text-gray-400"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Criando..." : "Criar Admin"}
          </Button>
        </form>

        {(error || success) && (
          <div
            className={`text-center mt-4 ${error ? "text-red-500" : "text-green-500"}`}
          >
            {error || success}
          </div>
        )}
      </div>
    </div>
  );
}
