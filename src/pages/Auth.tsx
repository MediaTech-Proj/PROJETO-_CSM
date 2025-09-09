import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Auth() {
  const [tab, setTab] = useState("login");
  const { refreshUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const endpoint = tab === "register" ? "/register" : "/login";
      const body = tab === "register"
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };
      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao autenticar");
      if (tab === "register") {
        setSuccess("Cadastro realizado! Faça login.");
        setTab("login");
        setForm({ name: "", email: "", password: "" });
      } else {
        // Salva token e atualiza contexto
        localStorage.setItem("token", data.token);
        await refreshUser();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-card">
        <h1 className="text-2xl font-bold text-center mb-6">Bem-vindo</h1>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Cadastro</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <Input type="email" name="email" placeholder="seu@email.com" required value={form.email} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm mb-1">Senha</label>
                <Input type="password" name="password" placeholder="••••••••" required value={form.password} onChange={handleChange} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-1">Nome</label>
                <Input type="text" name="name" placeholder="Seu nome" required value={form.name} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <Input type="email" name="email" placeholder="seu@email.com" required value={form.email} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm mb-1">Senha</label>
                <Input type="password" name="password" placeholder="••••••••" required value={form.password} onChange={handleChange} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Cadastrando..." : "Cadastrar"}</Button>
            </form>
          </TabsContent>
        </Tabs>

        {(error || success) && (
          <div className={`text-center mt-4 ${error ? "text-red-500" : "text-green-500"}`}>{error || success}</div>
        )}

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-primary hover:text-primary-glow transition-colors">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
