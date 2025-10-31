import { Play, Info, Star, Calendar, Users } from "lucide-react";
import { Button } from "./ui/button";
import heroBackground from "@/assets/hero-background.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export const Hero = () => {
  const navigate = useNavigate();
  const [openHowItWorks, setOpenHowItWorks] = useState(false);

  const handleClick = () => {
    navigate("/movies");
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            <span className="bg-gradient-to-r from-primary-glow to-secondary-glow bg-clip-text text-transparent">
              Descubra
            </span>
            <br />
            <span className="text-foreground">o que assistir</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Recomendações personalizadas para encontrar seu próximo filme favorito.
            Mais de 50.000 títulos esperando por você.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>9.2/10 Usuários</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-secondary" />
              <span>1M+ Descobertas</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-glow hover:to-secondary-glow shadow-glow-primary text-white px-8 py-3 rounded-full font-semibold"
              onClick={handleClick}
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Começar Agora
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-border/50 text-foreground hover:bg-muted/50 hover:border-primary/50 px-8 py-3 rounded-full font-semibold"
              onClick={() => setOpenHowItWorks(true)}
            >
              <Info className="w-5 h-5 mr-2" />
              Como Funciona
            </Button>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Modal "Como Funciona" */}
      <Dialog open={openHowItWorks} onOpenChange={setOpenHowItWorks}>
        <DialogContent className="max-w-2xl bg-background text-white p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">Como Funciona</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300 mb-4 leading-relaxed">
            O MediaTech é um site que recomenda filmes e séries com base em suas preferências.
            Você pode explorar filmes populares, clássicos e novidades em alta,
            adicionar aos seus favoritos e descobrir títulos que combinam com seu gosto.
          </p>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Basta navegar pelas seções, usar a barra de pesquisa para encontrar qualquer filme
            e clicar nos cards para ver detalhes, avaliações e mais informações.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Comece agora mesmo e descubra seu próximo filme favorito em poucos cliques!
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
};
