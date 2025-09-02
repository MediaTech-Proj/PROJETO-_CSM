import { ChevronLeft, ChevronRight, TrendingUp, Clock, Award } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { Button } from "./ui/button";

interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  duration?: string;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  icon?: "trending" | "classic" | "award";
}

const getIcon = (iconType?: string) => {
  switch (iconType) {
    case "trending":
      return <TrendingUp className="w-5 h-5" />;
    case "classic":
      return <Clock className="w-5 h-5" />;
    case "award":
      return <Award className="w-5 h-5" />;
    default:
      return null;
  }
};

export const MovieSection = ({ title, movies, icon }: MovieSectionProps) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-2 rounded-lg">
                {getIcon(icon)}
              </div>
            )}
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
              genre={movie.genre}
              poster={movie.poster}
              duration={movie.duration}
            />
          ))}
        </div>
      </div>
    </section>
  );
};