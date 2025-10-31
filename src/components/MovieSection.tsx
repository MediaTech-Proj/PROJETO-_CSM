import { ChevronLeft, ChevronRight, TrendingUp, Clock, Award } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { Button } from "./ui/button";

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  duration?: string;
  description?: string;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  icon?: "trending" | "classic" | "award";
  onAddFavorite?: (movieId: number) => void;
}

const getIcon = (iconType?: string) => {
  switch (iconType) {
    case "trending": return <TrendingUp className="w-5 h-5" />;
    case "classic": return <Clock className="w-5 h-5" />;
    case "award": return <Award className="w-5 h-5" />;
    default: return null;
  }
};

export const MovieSection = ({ title, movies, icon, onAddFavorite }: MovieSectionProps) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {icon && <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-2 rounded-lg">{getIcon(icon)}</div>}
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
              genre={movie.genre}
              poster={movie.poster}
              duration={movie.duration}
              description={movie.description}   
              onAddFavorite={onAddFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
