import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Users, 
  Award, 
  Calendar,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  UserCheck
} from "lucide-react";

export function SenseiDashboard() {
  const senseiInfo = {
    name: "Sensei Takashi",
    classes: 6,
    students: 45,
    experience: "15 anos",
    belt: "6º Dan"
  };

  const todayClasses = [
    { time: "18:00", class: "Infantil A", students: 12, attendance: 10 },
    { time: "19:00", class: "Juvenil B", students: 15, attendance: 13 },
    { time: "20:00", class: "Adulto", students: 18, attendance: 0 }, // Ainda não aconteceu
  ];

  const upcomingEvaluations = [
    { student: "Maria Santos", belt: "Amarela → Laranja", date: "15 Fev", ready: true },
    { student: "João Silva", belt: "Branca → Amarela", date: "20 Fev", ready: true },
    { student: "Ana Costa", belt: "Laranja → Verde", date: "25 Fev", ready: false },
  ];

  const classPerformance = [
    { class: "Infantil A", attendance: 85, engagement: 92, progress: 78 },
    { class: "Juvenil B", attendance: 90, engagement: 88, progress: 85 },
    { class: "Adulto", attendance: 78, engagement: 85, progress: 90 },
  ];

  const recentMessages = [
    { from: "Maria Santos (Mãe)", message: "João não poderá comparecer hoje", time: "2h" },
    { from: "Administração", message: "Reunião pedagógica amanhã 14h", time: "4h" },
    { from: "Pedro Silva", message: "Dúvida sobre a próxima graduação", time: "1d" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-shadow">Bem-vindo, {senseiInfo.name}!</h1>
          <p className="text-muted-foreground">Painel do instrutor - {senseiInfo.belt}</p>
        </div>
        <Badge className="bg-gradient-primary text-primary-foreground px-3 py-1">
          {senseiInfo.experience} de experiência
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="oriental-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turmas</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{senseiInfo.classes}</div>
            <p className="text-xs text-muted-foreground">turmas ativas</p>
          </CardContent>
        </Card>

        <Card className="oriental-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{senseiInfo.students}</div>
            <p className="text-xs text-muted-foreground">total de alunos</p>
          </CardContent>
        </Card>

        <Card className="oriental-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliações</CardTitle>
            <Award className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">pendentes</p>
          </CardContent>
        </Card>

        <Card className="oriental-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presença Média</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">este mês</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Classes */}
        <Card className="oriental-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Aulas de Hoje
            </CardTitle>
            <CardDescription>
              Cronograma e presenças do dia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{class_.time}</span>
                    </div>
                    <div>
                      <p className="font-medium">{class_.class}</p>
                      <p className="text-sm text-muted-foreground">
                        {class_.attendance > 0 ? 
                          `${class_.attendance}/${class_.students} presentes` : 
                          `${class_.students} alunos esperados`}
                      </p>
                    </div>
                  </div>
                  {class_.attendance > 0 ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Button size="sm">
                      Fazer Chamada
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Evaluations */}
        <Card className="oriental-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Avaliações Pendentes
            </CardTitle>
            <CardDescription>
              Alunos prontos para graduação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvaluations.map((eval_, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{eval_.student}</p>
                    <p className="text-sm text-muted-foreground">{eval_.belt}</p>
                    <p className="text-xs text-muted-foreground">Data: {eval_.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={eval_.ready ? "default" : "secondary"}>
                      {eval_.ready ? "Pronto" : "Em preparo"}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Avaliar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Class Performance */}
        <Card className="oriental-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Performance das Turmas
            </CardTitle>
            <CardDescription>
              Métricas de cada turma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {classPerformance.map((performance, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium">{performance.class}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Frequência</span>
                      <span>{performance.attendance}%</span>
                    </div>
                    <Progress value={performance.attendance} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Engajamento</span>
                      <span>{performance.engagement}%</span>
                    </div>
                    <Progress value={performance.engagement} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Progresso Técnico</span>
                      <span>{performance.progress}%</span>
                    </div>
                    <Progress value={performance.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="oriental-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Mensagens Recentes
            </CardTitle>
            <CardDescription>
              Comunicações com alunos e administração
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/30">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-sm">{message.from}</p>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{message.message}</p>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Ver Todas as Mensagens
            </Button>
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
              <UserCheck className="w-6 h-6" />
              Fazer Chamada
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Award className="w-6 h-6" />
              Avaliar Aluno
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <BookOpen className="w-6 h-6" />
              Material Técnico
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