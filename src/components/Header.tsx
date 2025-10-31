import { Search, Film, User, LogOut } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useRef } from "react";
import { MovieCard } from "./MovieCard";

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    signOut();
  };

  const getUserInitials = (name: string) => (name ? name.charAt(0).toUpperCase() : "?");

  useEffect(() => {
    if (!search) {
      setShowResults(false);
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:3001/movies");
        const data = await res.json();
        const filtered = data.filter((m: any) =>
          m.title.toLowerCase().includes(search.toLowerCase())
        );
        setMovies(filtered);
        setShowResults(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node)
      ) {
        setSearch("");
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg shadow-glow-primary">
            <Film className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-glow to-secondary-glow bg-clip-text text-transparent">
              MediaTech
            </h1>
            <p className="text-xs text-muted-foreground">Descubra o que assistir</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Buscar filmes, séries, atores..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50 rounded-full focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>

          {/* Search Results */}
          {showResults && (
            <div
              ref={resultsRef}
              className="absolute top-full mt-2 left-0 right-0 max-h-96 overflow-y-auto bg-card rounded-lg shadow-lg z-50 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <div key={movie.id} onMouseDown={(e) => e.preventDefault()}>
                    <MovieCard
                      id={movie.id}
                      title={movie.title}
                      year={movie.year || 2024}
                      rating={movie.rating || 0}
                      genre={movie.genre || "Desconhecido"}
                      poster={movie.posterUrl || "/default-poster.jpg"}
                      duration={movie.duration}
                      description={movie.description}
                      onAddFavorite={() => { }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-400 col-span-full text-center">
                  Nenhum filme encontrado
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/favorites")}>
                  Meus Favoritos
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
                  Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleSignOut}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow shadow-glow-primary rounded-full"
            >
              <Link to="/auth">Entrar</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
