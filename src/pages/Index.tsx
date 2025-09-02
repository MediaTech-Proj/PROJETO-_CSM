import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MovieSection } from "@/components/MovieSection";

// Import movie posters
import quantumBreakPoster from "@/assets/movie-quantum-break.jpg";
import midnightParisPoster from "@/assets/movie-midnight-paris.jpg";
import desertStormPoster from "@/assets/movie-desert-storm.jpg";
import hauntingPoster from "@/assets/movie-haunting.jpg";
import oceanAdventuresPoster from "@/assets/movie-ocean-adventures.jpg";

// Mock data for movies
const popularMovies = [
  {
    id: "1",
    title: "Quantum Break",
    year: 2024,
    rating: 8.5,
    genre: "Sci-Fi",
    poster: quantumBreakPoster,
    duration: "2h 15m"
  },
  {
    id: "2",
    title: "Desert Storm",
    year: 2023,
    rating: 7.8,
    genre: "Ação",
    poster: desertStormPoster,
    duration: "1h 58m"
  },
  {
    id: "3",
    title: "The Haunting",
    year: 2024,
    rating: 8.2,
    genre: "Terror",
    poster: hauntingPoster,
    duration: "1h 45m"
  },
  {
    id: "4",
    title: "Ocean Adventures",
    year: 2023,
    rating: 7.5,
    genre: "Família",
    poster: oceanAdventuresPoster,
    duration: "1h 32m"
  },
  {
    id: "5",
    title: "Midnight in Paris",
    year: 2024,
    rating: 9.1,
    genre: "Romance",
    poster: midnightParisPoster,
    duration: "2h 05m"
  },
  {
    id: "6",
    title: "Quantum Break",
    year: 2024,
    rating: 8.5,
    genre: "Sci-Fi",
    poster: quantumBreakPoster,
    duration: "2h 15m"
  }
];

const classicMovies = [
  {
    id: "7",
    title: "Midnight in Paris",
    year: 2024,
    rating: 9.1,
    genre: "Romance",
    poster: midnightParisPoster,
    duration: "2h 05m"
  },
  {
    id: "8",
    title: "The Haunting",
    year: 2024,
    rating: 8.2,
    genre: "Terror",
    poster: hauntingPoster,
    duration: "1h 45m"
  },
  {
    id: "9",
    title: "Desert Storm",
    year: 2023,
    rating: 7.8,
    genre: "Ação",
    poster: desertStormPoster,
    duration: "1h 58m"
  },
  {
    id: "10",
    title: "Quantum Break",
    year: 2024,
    rating: 8.5,
    genre: "Sci-Fi",
    poster: quantumBreakPoster,
    duration: "2h 15m"
  },
  {
    id: "11",
    title: "Ocean Adventures",
    year: 2023,
    rating: 7.5,
    genre: "Família",
    poster: oceanAdventuresPoster,
    duration: "1h 32m"
  },
  {
    id: "12",
    title: "Midnight in Paris",
    year: 2024,
    rating: 9.1,
    genre: "Romance",
    poster: midnightParisPoster,
    duration: "2h 05m"
  }
];

const trendingMovies = [
  {
    id: "13",
    title: "Ocean Adventures",
    year: 2023,
    rating: 7.5,
    genre: "Família",
    poster: oceanAdventuresPoster,
    duration: "1h 32m"
  },
  {
    id: "14",
    title: "Quantum Break",
    year: 2024,
    rating: 8.5,
    genre: "Sci-Fi",
    poster: quantumBreakPoster,
    duration: "2h 15m"
  },
  {
    id: "15",
    title: "The Haunting",
    year: 2024,
    rating: 8.2,
    genre: "Terror",
    poster: hauntingPoster,
    duration: "1h 45m"
  },
  {
    id: "16",
    title: "Midnight in Paris",
    year: 2024,
    rating: 9.1,
    genre: "Romance",
    poster: midnightParisPoster,
    duration: "2h 05m"
  },
  {
    id: "17",
    title: "Desert Storm",
    year: 2023,
    rating: 7.8,
    genre: "Ação",
    poster: desertStormPoster,
    duration: "1h 58m"
  },
  {
    id: "18",
    title: "Ocean Adventures",
    year: 2023,
    rating: 7.5,
    genre: "Família",
    poster: oceanAdventuresPoster,
    duration: "1h 32m"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <main className="space-y-8">
        <MovieSection
          title="Filmes Populares do Momento"
          movies={popularMovies}
          icon="trending"
        />
        
        <MovieSection
          title="Clássicos Imperdíveis"
          movies={classicMovies}
          icon="classic"
        />
        
        <MovieSection
          title="Em Alta Agora"
          movies={trendingMovies}
          icon="award"
        />
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg shadow-glow-primary">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
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