import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, LogOut, Menu } from "lucide-react";
import { UserProfile } from "../auth/LoginForm";

interface DashboardHeaderProps {
  profile: UserProfile;
  userName: string;
  onLogout: () => void;
  onToggleSidebar?: () => void;
}

export function DashboardHeader({ profile, userName, onLogout, onToggleSidebar }: DashboardHeaderProps) {
  const getProfileColor = () => {
    switch (profile) {
      case "admin":
        return "bg-primary text-primary-foreground";
      case "sensei":
        return "bg-accent text-accent-foreground";
      case "student":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getProfileTitle = () => {
    switch (profile) {
      case "admin":
        return "Administrador";
      case "sensei":
        return "Sensei";
      case "student":
        return "Aluno";
      default:
        return "Usuário";
    }
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 transition-smooth">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <img src="/img/Prancheta 1.png" alt="Arena Ricardo Santos Logo" className="h-12 w-auto" /> 
          <div>
            <h1 className="font-bold text-lg">Arena Ricardo Santos</h1>
            <p className="text-xs text-muted-foreground">{getProfileTitle()}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full text-xs flex items-center justify-center text-primary-foreground">
            3
          </span>
        </Button>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="font-medium text-sm">{userName}</p>
            <p className="text-xs text-muted-foreground">{getProfileTitle()}</p>
          </div>
          
          <Avatar className={`w-10 h-10 ${getProfileColor()}`}>
            <AvatarFallback className={getProfileColor()}>
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onLogout}
          className="text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}