// src/pages/AllMovies.tsx
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
  category?: { name: string };
  description?: string; 
}

const AllMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:3001/movies");
      const data = await res.json();
      const mapped = data.map((m: any) => ({
        id: m.id,
        title: m.title,
        year: m.year || 2024,
        rating: m.rating || 0,
        genre: m.genre || "Desconhecido",
        poster: m.posterUrl || "/default-poster.jpg",
        duration: m.duration,
        category: m.category,
        description: m.description || "Descrição não disponível",
      }));
      setMovies(mapped);
    } catch (err) {
      console.error("Erro ao carregar filmes:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleToggleFavorite = async (movieId: number) => {
    if (!token) {
      alert("Você precisa estar logado para favoritar filmes!");
      return;
    }

    try {
      const resFavorites = await fetch("http://localhost:3001/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const favorites = await resFavorites.json();
      const isFavorite = favorites.some((m: any) => m.id === movieId);

      if (isFavorite) {
        // remover
        await fetch(`http://localhost:3001/favorites/${movieId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // adicionar
        await fetch("http://localhost:3001/favorites", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId }),
        });
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="space-y-8 mt-8">
        <MovieSection
          title="Todos os Filmes"
          movies={movies}
          icon="trending"
          onAddFavorite={handleToggleFavorite}
        />
      </main>
    </div>
  );
};

export default AllMovies;
