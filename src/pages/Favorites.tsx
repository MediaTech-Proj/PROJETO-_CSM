import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { MovieSection } from "@/components/MovieSection";

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  duration?: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchFavorites = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:3001/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      setFavorites(
        data.map((m: any) => ({
          id: m.id,
          title: m.title,
          year: m.year || 2024,
          rating: m.rating || 0,
          genre: m.genre || "Desconhecido",
          poster: m.posterUrl || "/default-poster.jpg",
          duration: m.duration,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [token]);

  const handleRemoveFavorite = async (movieId: number) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:3001/favorites/${movieId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        console.error("Erro ao remover favorito:", res.status);
        return;
      }
      // Atualiza o estado local removendo o filme
      setFavorites((prev) => prev.filter((m) => m.id !== movieId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="space-y-8 mt-8">
        <MovieSection
          title="Meus Favoritos"
          movies={favorites}
          icon="trending"
          onAddFavorite={handleRemoveFavorite} // Reutiliza a prop, mas agora remove
        />
      </main>
    </div>
  );
};

export default Favorites;
