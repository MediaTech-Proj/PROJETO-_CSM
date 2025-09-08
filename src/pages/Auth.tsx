import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Auth() {
  const [tab, setTab] = useState("login");

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-card">
        <h1 className="text-2xl font-bold text-center mb-6">Bem-vindo</h1>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Cadastro</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <Input type="email" placeholder="seu@email.com" required />
              </div>
              <div>
                <label className="block text-sm mb-1">Senha</label>
                <Input type="password" placeholder="••••••••" required />
              </div>
              <Button type="button" className="w-full">Entrar</Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Nome</label>
                <Input type="text" placeholder="Seu nome" required />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <Input type="email" placeholder="seu@email.com" required />
              </div>
              <div>
                <label className="block text-sm mb-1">Senha</label>
                <Input type="password" placeholder="••••••••" required />
              </div>
              <Button type="button" className="w-full">Cadastrar</Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-primary hover:text-primary-glow transition-colors">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
