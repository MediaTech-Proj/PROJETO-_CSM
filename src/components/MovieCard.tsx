import { useState } from "react";
import { Star, Play, Clock } from "lucide-react";

interface MovieCardProps {
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  duration?: string;
}

export const MovieCard = ({ title, year, rating, genre, poster, duration }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-movie-card rounded-lg overflow-hidden shadow-movie-card transition-all duration-300 hover:bg-movie-card-hover hover:shadow-elevated hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={poster}
          alt={`${title} poster`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary/90 rounded-full p-3 shadow-glow-primary backdrop-blur-sm">
            <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Rating badge */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs font-medium text-foreground">{rating.toFixed(1)}</span>
        </div>

        {/* Duration badge */}
        {duration && (
          <div className="absolute top-2 left-2 bg-secondary/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Clock className="w-3 h-3 text-secondary-foreground" />
            <span className="text-xs font-medium text-secondary-foreground">{duration}</span>
          </div>
        )}
      </div>

      {/* Movie info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-sm line-clamp-1 mb-1">{title}</h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{year}</span>
          <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-full">{genre}</span>
        </div>
      </div>

      {/* Hover glow effect */}
      <div 
        className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'shadow-glow-primary' : ''
        }`}
      />
    </div>
  );
};