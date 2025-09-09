import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, signOut, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, password: "" });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao atualizar");

      setMessage("Dados atualizados!");
      await refreshUser();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    if (!confirm("Tem certeza que deseja excluir sua conta?")) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao deletar conta");

      await signOut();
      navigate("/auth");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-card rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Meu Perfil</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Nome</label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <Input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm mb-1">Nova Senha</label>
          <Input type="password" name="password" value={form.password} onChange={handleChange} />
        </div>

        {message && <p className="text-center text-red-500">{message}</p>}

        <div className="flex justify-between mt-4">
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Atualizando..." : "Atualizar"}
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Excluindo..." : "Excluir Conta"}
          </Button>
        </div>
      </div>
    </div>
  );
}
