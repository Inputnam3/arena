
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  Users, 
  Calendar, 
  BookOpen, 
  Trophy, 
  MessageSquare,
  Settings,
  BarChart3,
  UserCheck,
  GraduationCap,
  Award,
  Upload,
  CreditCard,
  FileText,
  Bell,
  Megaphone,
  DollarSign
} from "lucide-react";
import { UserProfile } from "../pages/Login"; // Corrected path

interface SidebarItem {
  title: string;
  icon: any;
  path: string;
  badge?: number;
}

interface DashboardSidebarProps {
  profile: UserProfile;
  currentPath: string;
  onNavigate: (path: string) => void;
  isCollapsed?: boolean;
}

export function DashboardSidebar({ 
  profile, 
  currentPath, 
  onNavigate, 
  isCollapsed = false 
}: DashboardSidebarProps) {
  
  const getMenuItems = (): SidebarItem[] => {
    const commonItems = [
      { title: "Dashboard", icon: Home, path: "/admin" },
      { title: "Mensagens", icon: MessageSquare, path: "/admin/messages", badge: 2 },
    ];

    switch (profile) {
      case "admin":
        return [
          { title: "Dashboard", icon: Home, path: "/admin" },
          { title: "Gerenciar Alunos", icon: Users, path: "/admin/alunos" },
          { title: "Gerenciar Professores", icon: UserCheck, path: "/admin/professores" },
          { title: "Gerenciar Aulas", icon: Calendar, path: "/admin/aulas" },
          { title: "Financeiro", icon: DollarSign, path: "/admin/financeiro" },
          { title: "Enviar Comunicados", icon: Megaphone, path: "/admin/comunicados" },
          { title: "Relatórios", icon: BarChart3, path: "/admin/relatorios" },
          { title: "Configurações", icon: Settings, path: "/admin/settings" },
        ];

      case "sensei":
        return [
          ...commonItems,
          { title: "Minhas Turmas", icon: BookOpen, path: "/sensei/my-classes" },
          { title: "Chamada", icon: UserCheck, path: "/sensei/attendance" },
          { title: "Avaliações", icon: Award, path: "/sensei/evaluations" },
          { title: "Materiais", icon: Upload, path: "/sensei/materials" },
          { title: "Relatórios", icon: FileText, path: "/sensei/reports" },
        ];

      case "student":
        return [
          ...commonItems,
          { title: "Minha Agenda", icon: Calendar, path: "/student/schedule" },
          { title: "Presenças", icon: UserCheck, path: "/student/my-attendance" },
          { title: "Evolução", icon: Award, path: "/student/progress" },
          { title: "Eventos", icon: Trophy, path: "/student/events" },
          { title: "Materiais", icon: BookOpen, path: "/student/materials" },
          { title: "Comunicados", icon: Bell, path: "/student/announcements" },
        ];

      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className={`bg-card border-r border-border h-full flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="p-4">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <img src="/img/Prancheta 1.png" alt="Arena Ricardo Santos Logo" className="h-12 w-auto" />
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg">Arena</h2>
              <p className="text-xs text-muted-foreground">Ricardo Santos</p>
            </div>
          )}
        </div>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2 py-4">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname.startsWith(item.path) ? "default" : "ghost"}
              className={`w-full nav-item justify-start ${
                isCollapsed ? 'px-2' : ''
              }`}
              onClick={() => onNavigate(item.path)}
            >
              <item.icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {!isCollapsed && (
        <>
          <Separator />
          <div className="p-4">
            <div className="bg-gradient-primary rounded-lg p-4 text-primary-foreground">
              <h3 className="font-semibold text-sm mb-2">Dica do Dia</h3>
              <p className="text-xs opacity-90">
                "O judô não ensina apenas técnicas de luta, mas também disciplina mental e respeito."
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardSidebar;
