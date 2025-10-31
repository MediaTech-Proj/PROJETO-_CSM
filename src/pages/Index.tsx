import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
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

const Index = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [classicMovies, setClassicMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:3001/movies");
        const data = await res.json();

        const mappedMovies = data.map((m: any) => ({
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

        setPopularMovies(mappedMovies.filter((m) => m.category?.name.toLowerCase() === "popular"));
        setClassicMovies(mappedMovies.filter((m) => m.category?.name.toLowerCase() === "clássicos"));
        setTrendingMovies(mappedMovies.filter((m) => m.category?.name.toLowerCase() === "em alta"));
      } catch (err) {
        console.error("Erro ao carregar filmes:", err);
      }
    };

    fetchMovies();
  }, []);

  const handleAddFavorite = async (movieId: number) => {
    if (!token) return alert("Você precisa estar logado para favoritar filmes!");
    try {
      const res = await fetch("http://localhost:3001/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return alert(data.message || "Erro ao adicionar favorito");
      }
      alert("Filme adicionado aos favoritos!");
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar favorito");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <main className="space-y-8">
        <MovieSection title="Filmes Populares do Momento" movies={popularMovies} icon="trending" onAddFavorite={handleAddFavorite} />
        <MovieSection title="Clássicos Imperdíveis" movies={classicMovies} icon="classic" onAddFavorite={handleAddFavorite} />
        <MovieSection title="Em Alta Agora" movies={trendingMovies} icon="award" onAddFavorite={handleAddFavorite} />
      </main>

      <footer className="bg-card/50 border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg shadow-glow-primary">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-glow to-secondary-glow bg-clip-text text-transparent">
              MediaTech Store
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2025 MediaTech Store. Todos os direitos reservados. | Descubra. Assista. Explore.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
