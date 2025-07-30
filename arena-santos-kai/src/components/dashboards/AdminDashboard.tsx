import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  Trophy,
  DollarSign,
  BookOpen
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total de Alunos",
      value: "156",
      change: "+12 este mês",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Senseis Ativos",
      value: "8",
      change: "2 novos contratados",
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Turmas Ativas",
      value: "24",
      change: "3 turmas cheias",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Receita Mensal",
      value: "R$ 24.500",
      change: "+8% vs mês anterior",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  const recentActivities = [
    { action: "Novo aluno matriculado", student: "Maria Silva", time: "2 horas atrás", type: "success" },
    { action: "Pagamento em atraso", student: "João Santos", time: "1 dia atrás", type: "warning" },
    { action: "Faixa promovida", student: "Pedro Costa", time: "2 dias atrás", type: "success" },
    { action: "Evento criado", student: "Campeonato Regional", time: "3 dias atrás", type: "info" },
  ];

  const upcomingEvents = [
    { name: "Exame de Faixa", date: "2024-02-15", participants: 12 },
    { name: "Campeonato Regional", date: "2024-02-20", participants: 45 },
    { name: "Workshop Técnico", date: "2024-02-25", participants: 8 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-shadow">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">Visão geral da Arena Ricardo Santos</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          Hoje: {new Date().toLocaleDateString('pt-BR')}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="oriental-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card className="oriental-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>
              Últimas movimentações no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.student}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="oriental-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Próximos Eventos
            </CardTitle>
            <CardDescription>
              Eventos programados para os próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {event.participants} participantes
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="oriental-card">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso rápido às principais funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Users className="w-6 h-6" />
              Novo Aluno
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Calendar className="w-6 h-6" />
              Agendar Evento
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <AlertTriangle className="w-6 h-6" />
              Comunicado
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <TrendingUp className="w-6 h-6" />
              Relatório
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}