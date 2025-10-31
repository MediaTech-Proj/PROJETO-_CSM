import { useEffect, useState } from "react";
import { Star, Heart, HeartOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  duration?: string;
  description?: string;
  onAddFavorite?: (movieId: number) => void;
}

export const MovieCard = ({
  id,
  title,
  year,
  rating,
  genre,
  poster,
  duration,
  description,
  onAddFavorite,
}: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:3001/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        setIsFavorite(data.some((m: any) => m.id === id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavorites();
  }, [id, token]);

  const handleToggleFavorite = async () => {
    if (!token) return alert("Você precisa estar logado!");
    try {
      if (isFavorite) {
        // remover dos favoritos
        await fetch(`http://localhost:3001/favorites/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFavorite(false);
      } else {
        // adicionar aos favoritos
        await fetch("http://localhost:3001/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ movieId: id }),
        });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar favoritos");
    }
  };

  return (
    <>
      {/* CARD */}
      <div
        className="group relative bg-movie-card rounded-lg overflow-hidden shadow-movie-card transition-all duration-300 hover:bg-movie-card-hover hover:shadow-elevated hover:scale-105 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setOpen(true)}
      >
        <img
          src={poster}
          alt={title}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFavorite();
          }}
          className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full p-1.5"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-white"}`} />
        </button>

        <div className="p-3">
          <h3 className="font-semibold text-sm truncate">{title}</h3>
          <p className="text-xs text-muted-foreground">{genre} • {year}</p>
          <p className="text-xs text-muted-foreground">⭐ {rating.toFixed(1)}</p>
        </div>
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl bg-background text-white p-0 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Poster */}
            <div className="md:w-1/2">
              <img src={poster} alt={title} className="w-full h-full object-cover" />
            </div>

            {/* Conteúdo */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-2">{title}</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-gray-400 mb-4">
                  {year} • {genre} {duration && `• ${duration}`}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm">{rating}/10</span>
                </div>

                {/* Descrição */}
                <div className="mb-6">
                  {description ? (
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{description}</p>
                  ) : (
                    <p className="text-gray-500 italic">Descrição indisponível</p>
                  )}
                </div>
              </div>

              {/* Botão favoritos no modal */}
              <Button
                onClick={handleToggleFavorite}
                className={`w-full ${isFavorite ? "bg-red-600 hover:bg-red-700" : "bg-primary hover:bg-primary-glow"}`}
              >
                {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
