
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, UserCheck, Users } from "lucide-react";
import { useState } from "react";

const AlunosPage = () => {
  const [activeSection, setActiveSection] = useState('hub'); // hub, cadastrar, editar, todos

  const renderContent = () => {
    switch (activeSection) {
      case 'cadastrar':
        return <CadastrarAlunoSection />;
      case 'editar':
        return <EditarAlunoSection />;
      case 'todos':
        return <TodosAlunosSection />;
      default:
        return <AlunosHub onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gerenciar Alunos</h1>
      {renderContent()}
    </div>
  );
};

const AlunosHub = ({ onNavigate }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Button onClick={() => onNavigate('cadastrar')} className="h-24 text-lg">
      <UserPlus className="w-8 h-8 mr-4" />
      Cadastrar Aluno
    </Button>
    <Button onClick={() => onNavigate('editar')} className="h-24 text-lg">
      <UserCheck className="w-8 h-8 mr-4" />
      Editar Aluno
    </Button>
    <Button onClick={() => onNavigate('todos')} className="h-24 text-lg">
      <Users className="w-8 h-8 mr-4" />
      Todos os Alunos
    </Button>
  </div>
);

const CadastrarAlunoSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Cadastrar Novo Aluno</CardTitle>
    </CardHeader>
    <CardContent>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input placeholder="Nome Completo" />
        <Input type="email" placeholder="E-mail" />
        <Input type="tel" placeholder="Telefone" />
        <Input type="date" placeholder="Data de Nascimento" />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a Faixa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="branca">Branca</SelectItem>
            <SelectItem value="cinza">Cinza</SelectItem>
            <SelectItem value="azul">Azul</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" className="md:col-span-2">CADASTRAR ALUNO</Button>
      </form>
    </CardContent>
  </Card>
);

const EditarAlunoSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Editar Aluno Existente</CardTitle>
    </CardHeader>
    <CardContent>
      <form className="space-y-4">
        <Input placeholder="Pesquisar aluno por nome ou e-mail" />
        <Button type="submit" className="w-full">BUSCAR ALUNO</Button>
      </form>
    </CardContent>
  </Card>
);

const TodosAlunosSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Lista de Todos os Alunos</CardTitle>
    </CardHeader>
    <CardContent>
      <Input placeholder="Pesquisar aluno..." className="mb-4" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Faixa</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>João Silva</TableCell>
            <TableCell>joao.silva@email.com</TableCell>
            <TableCell>(45) 99900-1111</TableCell>
            <TableCell>Branca</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2">Editar</Button>
              <Button variant="destructive" size="sm">Excluir</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Maria Souza</TableCell>
            <TableCell>maria.souza@email.com</TableCell>
            <TableCell>(45) 99900-2222</TableCell>
            <TableCell>Cinza</TableCell>
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

export default AlunosPage;
