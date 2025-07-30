
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarPlus, Calendar } from "lucide-react";
import { useState } from "react";

const AulasPage = () => {
  const [activeSection, setActiveSection] = useState('hub'); // hub, cadastrar, todas

  const renderContent = () => {
    switch (activeSection) {
      case 'cadastrar':
        return <CadastrarAulaSection />;
      case 'todas':
        return <TodasAulasSection />;
      default:
        return <AulasHub onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gerenciar Aulas</h1>
      {renderContent()}
    </div>
  );
};

const AulasHub = ({ onNavigate }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Button onClick={() => onNavigate('cadastrar')} className="h-24 text-lg">
      <CalendarPlus className="w-8 h-8 mr-4" />
      Cadastrar Aula
    </Button>
    <Button onClick={() => onNavigate('todas')} className="h-24 text-lg">
      <Calendar className="w-8 h-8 mr-4" />
      Todas as Aulas
    </Button>
  </div>
);

const CadastrarAulaSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Adicionar Nova Aula</CardTitle>
    </CardHeader>
    <CardContent>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input placeholder="Nome da Aula (ex: Judô Infantil)" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o Professor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ricardo">Prof. Ricardo</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Dia da Semana (ex: Segunda, Quarta)" />
        <Input type="time" placeholder="Horário (ex: 18:00)" />
        <Input placeholder="Local (ex: Tatame Principal)" />
        <Button type="submit" className="md:col-span-2">CADASTRAR AULA</Button>
      </form>
    </CardContent>
  </Card>
);

const TodasAulasSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Lista de Todas as Aulas</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aula</TableHead>
            <TableHead>Professor</TableHead>
            <TableHead>Dia</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Local</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Judô Infantil</TableCell>
            <TableCell>Prof. Ricardo</TableCell>
            <TableCell>Segunda</TableCell>
            <TableCell>18:00</TableCell>
            <TableCell>Tatame Principal</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2">Editar</Button>
              <Button variant="destructive" size="sm">Excluir</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default AulasPage;
