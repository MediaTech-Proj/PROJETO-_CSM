import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function AdminUsers() {
    const API_URL = "http://localhost:3001/admin/users";

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [editId, setEditId] = useState<number | null>(null);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const loadUsers = async () => {
        if (!token) return;
        try {
            const res = await fetch(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) throw new Error("Token inválido ou expirado.");
            const data = await res.json();
            if (!Array.isArray(data)) throw new Error("Resposta inválida do servidor.");
            setUsers(data);
            setLoading(false);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            setError("Token não encontrado. Faça login.");
            setLoading(false);
            return;
        }
        loadUsers();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(form),
        });
        setForm({ name: "", email: "", password: "" });
        loadUsers();
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editId || !token) return;
        await fetch(`${API_URL}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(form),
        });
        setEditId(null);
        setForm({ name: "", email: "", password: "" });
        loadUsers();
    };

    const handleDelete = async (id: number) => {
        if (!token) return;
        if (confirm("Deseja realmente excluir este usuário?")) {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            loadUsers();
        }
    };

    const startEdit = (user: User) => {
        setEditId(user.id);
        setForm({ name: user.name, email: user.email, password: "" });
    };

    return (
        <div className="p-6 bg-black text-white min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Administração de Usuários</h1>

            <div className="mb-4">
                <Link
                    to="/admin/register"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Criar Novo Admin
                </Link>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <table className="w-full border-collapse border border-white">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Nome</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td className="border p-2">{u.id}</td>
                                <td className="border p-2">{u.name}</td>
                                <td className="border p-2">{u.email}</td>
                                <td className="border p-2">
                                    <button
                                        className="bg-yellow-400 px-2 py-1 rounded mr-2"
                                        onClick={() => startEdit(u)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(u.id)}
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Formulário */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold">{editId ? "Editar Usuário" : "Criar Usuário"}</h2>
                <form
                    onSubmit={editId ? handleEdit : handleCreate}
                    className="flex flex-col gap-2 max-w-md mt-2"
                >
                    <input
                        type="text"
                        placeholder="Nome"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="border p-2 rounded bg-gray-700 text-white"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="border p-2 rounded bg-gray-700 text-white"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="border p-2 rounded bg-gray-700 text-white"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
                    >
                        {editId ? "Salvar Alterações" : "Criar Usuário"}
                    </button>
                    {editId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditId(null);
                                setForm({ name: "", email: "", password: "" });
                            }}
                            className="bg-gray-400 px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
