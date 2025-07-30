import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Users, GraduationCap } from "lucide-react";

export type UserProfile = "admin" | "student" | "sensei";

interface LoginFormProps {
  onLogin: (profile: UserProfile, email: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState<UserProfile>("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(profile, email);
  };

  const getProfileIcon = (profileType: UserProfile) => {
    switch (profileType) {
      case "admin":
        return <Shield className="w-5 h-5" />;
      case "student":
        return <Users className="w-5 h-5" />;
      case "sensei":
        return <GraduationCap className="w-5 h-5" />;
    }
  };

  const getProfileLabel = (profileType: UserProfile) => {
    switch (profileType) {
      case "admin":
        return "Administrador";
      case "student":
        return "Aluno/Responsável";
      case "sensei":
        return "Sensei/Instrutor";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-oriental relative overflow-hidden">
      {/* Background Oriental Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/20 blur-3xl animate-glow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-glow delay-1000"></div>
      </div>

      <Card className="w-full max-w-md oriental-card animate-fade-in relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">道</span>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-shadow">Arena Ricardo Santos</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sistema de gestão para escola de judô
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profile">Perfil de Acesso</Label>
              <Select value={profile} onValueChange={(value: UserProfile) => setProfile(value)}>
                <SelectTrigger className="transition-smooth">
                  <SelectValue placeholder="Selecione seu perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">
                    <div className="flex items-center gap-2">
                      {getProfileIcon("student")}
                      {getProfileLabel("student")}
                    </div>
                  </SelectItem>
                  <SelectItem value="sensei">
                    <div className="flex items-center gap-2">
                      {getProfileIcon("sensei")}
                      {getProfileLabel("sensei")}
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      {getProfileIcon("admin")}
                      {getProfileLabel("admin")}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-smooth"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-smooth"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full gradient-primary hover:opacity-90 transition-smooth text-lg py-6"
            >
              <div className="flex items-center gap-2">
                {getProfileIcon(profile)}
                Entrar como {getProfileLabel(profile)}
              </div>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}