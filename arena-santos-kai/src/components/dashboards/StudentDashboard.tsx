import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Award, 
  Trophy, 
  Clock,
  Target,
  BookOpen,
  CheckCircle,
  Star
} from "lucide-react";

export function StudentDashboard() {
  const studentInfo = {
    name: "João Silva",
    currentBelt: "Amarela",
    nextBelt: "Laranja",
    progress: 75,
    class: "Juvenil A - Terças e Quintas",
    sensei: "Sensei Takashi",
    monthlyAttendance: 85
  };

  const nextClasses = [
    { day: "Hoje", time: "19:00", type: "Treino Técnico", status: "confirmed" },
    { day: "Quinta", time: "19:00", type: "Randori", status: "pending" },
    { day: "Sábado", time: "10:00", type: "Exame de Faixa", status: "special" },
  ];

  const achievements = [
    { title: "1º Lugar Regional", date: "Jan 2024", type: "competition" },
    { title: "Faixa Amarela", date: "Set 2023", type: "belt" },
    { title: "100% Presença", date: "Dez 2023", type: "attendance" },
  ];

  const techniques = [
    { name: "O-goshi", mastery: 90, category: "Nage-waza" },
    { name: "Osoto-gari", mastery: 85, category: "Nage-waza" },
    { name: "Ippon-seoi-nage", mastery: 70, category: "Nage-waza" },
    { name: "Kesa-gatame", mastery: 95, category: "Katame-waza" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-shadow">Olá, {studentInfo.name}!</h1>
          <p className="text-muted-foreground">Acompanhe sua jornada no judô</p>
        </div>
        <Badge className="bg-gradient-primary text-primary-foreground px-3 py-1">
          Faixa {studentInfo.currentBelt}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress Card */}
        <Card className="oriental-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Progresso da Faixa
            </CardTitle>
            <CardDescription>
              Caminho para a faixa {studentInfo.nextBelt}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Faixa {studentInfo.currentBelt}</span>
              <span className="text-sm font-medium">Faixa {studentInfo.nextBelt}</span>
            </div>
            <Progress value={studentInfo.progress} className="h-3" />
            <p className="text-center text-sm text-muted-foreground">
              {studentInfo.progress}% concluído
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{studentInfo.monthlyAttendance}%</div>
                <p className="text-xs text-muted-foreground">Presença Mensal</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <p className="text-xs text-muted-foreground">Meses na Faixa</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Class Info */}
        <Card className="oriental-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Minha Turma
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">{studentInfo.class}</p>
              <p className="text-sm text-muted-foreground">Instrutor: {studentInfo.sensei}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Treinos este mês</span>
                <span className="font-medium">12/14</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Próximo exame</span>
                <span className="font-medium">15 Mar</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Next Classes */}
        <Card className="oriental-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Próximas Aulas
            </CardTitle>
            <CardDescription>
              Sua agenda de treinos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      class_.status === 'confirmed' ? 'bg-green-500' :
                      class_.status === 'special' ? 'bg-primary' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <p className="font-medium">{class_.day} - {class_.time}</p>
                      <p className="text-sm text-muted-foreground">{class_.type}</p>
                    </div>
                  </div>
                  {class_.status === 'pending' && (
                    <Button size="sm" variant="outline">
                      Confirmar
                    </Button>
                  )}
                  {class_.status === 'confirmed' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="oriental-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Conquistas
            </CardTitle>
            <CardDescription>
              Seus marcos no judô
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className={`p-2 rounded-lg ${
                    achievement.type === 'competition' ? 'bg-yellow-100 text-yellow-600' :
                    achievement.type === 'belt' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-600'
                  }`}>
                    {achievement.type === 'competition' ? <Trophy className="w-4 h-4" /> :
                     achievement.type === 'belt' ? <Award className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Techniques Progress */}
      <Card className="oriental-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Progresso Técnico
          </CardTitle>
          <CardDescription>
            Domínio das técnicas de judô
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {techniques.map((technique, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{technique.name}</p>
                    <p className="text-xs text-muted-foreground">{technique.category}</p>
                  </div>
                  <span className="text-sm font-medium">{technique.mastery}%</span>
                </div>
                <Progress value={technique.mastery} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}