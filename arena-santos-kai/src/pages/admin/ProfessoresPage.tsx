
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProfessoresPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gerenciar Professores</h1>

      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Professor</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Nome Completo" />
            <Input type="email" placeholder="E-mail" />
            <Input type="tel" placeholder="Telefone" />
            <Input placeholder="Especialidade" />
            <Button type="submit" className="md:col-span-2">ADICIONAR PROFESSOR</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Professores</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Pesquisar professor..." className="mb-4" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Prof. Ricardo Santos</TableCell>
                <TableCell>ricardo.santos@email.com</TableCell>
                <TableCell>(45) 99900-3333</TableCell>
                <TableCell>Judô, Defesa Pessoal</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Editar</Button>
                  <Button variant="destructive" size="sm">Excluir</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessoresPage;
