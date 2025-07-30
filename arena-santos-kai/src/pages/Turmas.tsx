
import { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import TurmaForm from "@/components/forms/TurmaForm";

interface Turma {
  id: string;
  nome: string;
  horario: string;
  dias_da_semana: string;
  instrutor: string;
  capacidade: number;
  status: string;
}

const Turmas = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTurma, setEditingTurma] = useState<Turma | undefined>(undefined);
  const { toast } = useToast();

  const fetchTurmas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/turmas');
      setTurmas(response.data);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
      toast({ title: "Erro", description: "Não foi possível carregar as turmas.", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchTurmas();
  }, []);

  const handleSaveTurma = async (data: Omit<Turma, 'id'>) => {
    try {
      if (editingTurma) {
        // Edição
        const response = await axios.put(`http://localhost:3001/api/turmas/${editingTurma.id}`, data);
        setTurmas((prevTurmas) =>
          prevTurmas.map((turma) => (turma.id === editingTurma.id ? response.data : turma))
        );
        toast({ title: "Sucesso", description: "Turma atualizada com sucesso!" });
      } else {
        // Adição
        const response = await axios.post('http://localhost:3001/api/turmas', data);
        setTurmas((prevTurmas) => [...prevTurmas, response.data]);
        toast({ title: "Sucesso", description: "Turma adicionada com sucesso!" });
      }
      setIsModalOpen(false);
      setEditingTurma(undefined); // Limpa a turma em edição
    } catch (error) {
      console.error("Erro ao salvar turma:", error);
      toast({ title: "Erro", description: "Não foi possível salvar a turma.", variant: "destructive" });
    }
  };

  const handleDeleteTurma = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/turmas/${id}`);
      setTurmas((prevTurmas) => prevTurmas.filter((turma) => turma.id !== id));
      toast({ title: "Sucesso", description: "Turma excluída com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir turma:", error);
      toast({ title: "Erro", description: "Não foi possível excluir a turma.", variant: "destructive" });
    }
  };

  const openEditModal = (turma: Turma) => {
    setEditingTurma(turma);
    setIsModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditingTurma(undefined); // Limpa a turma em edição ao fechar o modal
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Turmas</h1>
        <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTurma(undefined)}>Adicionar Turma</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingTurma ? "Editar Turma" : "Adicionar Nova Turma"}</DialogTitle>
            </DialogHeader>
            <TurmaForm onSubmit={handleSaveTurma} initialData={editingTurma} />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Turmas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Dias</TableHead>
                <TableHead>Instrutor</TableHead>
                <TableHead>Capacidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Ações</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {turmas.map((turma) => (
                <TableRow key={turma.id}>
                  <TableCell className="font-medium">{turma.nome}</TableCell>
                  <TableCell>{turma.horario}</TableCell>
                  <TableCell>{turma.dias_da_semana}</TableCell>
                  <TableCell>{turma.instrutor}</TableCell>
                  <TableCell>{turma.capacidade}</TableCell>
                  <TableCell>
                    <Badge variant={turma.status === "Ativa" ? "default" : "outline"}>
                      {turma.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openEditModal(turma)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteTurma(turma.id)}>Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Turmas;
