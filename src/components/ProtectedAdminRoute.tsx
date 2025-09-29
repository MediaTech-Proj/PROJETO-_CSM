import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function ProtectedAdminRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role === "admin") setIsAdmin(true);
      else navigate("/");
    } catch {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) return <div>Carregando...</div>;
  if (!isAdmin) return null;

  return <>{children}</>;
}
