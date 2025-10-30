import { useEffect, useState } from "react";
import { Star, Play, Clock, Heart } from "lucide-react";

interface MovieCardProps {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  duration?: string;
  onAddFavorite?: (movieId: number) => void;
}

export const MovieCard = ({ id, title, year, rating, genre, poster, duration, onAddFavorite }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleFavorite = () => {
    if (onAddFavorite) onAddFavorite(id);
    setIsFavorite(true);
  };

  return (
    <div
      className="group relative bg-movie-card rounded-lg overflow-hidden shadow-movie-card transition-all duration-300 hover:bg-movie-card-hover hover:shadow-elevated hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={poster} alt={title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300" />

      <button
        onClick={(e) => { e.stopPropagation(); handleFavorite(); }}
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
  );
};
