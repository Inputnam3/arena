
import { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AlunoForm from "@/components/forms/AlunoForm";
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";

interface Aluno {
  id: string;
  nome: string;
  faixa: string;
  turma: string;
  status: string;
  email: string;
}

const Alunos = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAluno, setEditingAluno] = useState<Aluno | undefined>(undefined);
  const { toast } = useToast();

  const fetchAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/alunos');
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      toast({ title: "Erro", description: "Não foi possível carregar os alunos.", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleSaveAluno = async (data: Omit<Aluno, 'id' | 'status'>) => {
    try {
      if (editingAluno) {
        // Edição
        const response = await axios.put(`http://localhost:3001/api/alunos/${editingAluno.id}`, data);
        setAlunos((prevAlunos) =>
          prevAlunos.map((aluno) => (aluno.id === editingAluno.id ? response.data : aluno))
        );
        toast({ title: "Sucesso", description: "Aluno atualizado com sucesso!" });
      } else {
        // Adição
        const response = await axios.post('http://localhost:3001/api/alunos', data);
        setAlunos((prevAlunos) => [...prevAlunos, response.data]);
        toast({ title: "Sucesso", description: "Aluno adicionado com sucesso!" });
      }
      setIsModalOpen(false);
      setEditingAluno(undefined); // Limpa o aluno em edição
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      toast({ title: "Erro", description: "Não foi possível salvar o aluno.", variant: "destructive" });
    }
  };

  const handleDeleteAluno = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/alunos/${id}`);
      setAlunos((prevAlunos) => prevAlunos.filter((aluno) => aluno.id !== id));
      toast({ title: "Sucesso", description: "Aluno excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
      toast({ title: "Erro", description: "Não foi possível excluir o aluno.", variant: "destructive" });
    }
  };

  const openEditModal = (aluno: Aluno) => {
    setEditingAluno(aluno);
    setIsModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setEditingAluno(undefined); // Limpa o aluno em edição ao fechar o modal
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Alunos</h1>
        <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingAluno(undefined)}>Adicionar Aluno</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingAluno ? "Editar Aluno" : "Adicionar Novo Aluno"}</DialogTitle>
            </DialogHeader>
            <AlunoForm onSubmit={handleSaveAluno} initialData={editingAluno} />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Faixa</TableHead>
                <TableHead>Turma</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Ações</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunos.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell className="font-medium">{aluno.nome}</TableCell>
                  <TableCell>{aluno.faixa}</TableCell>
                  <TableCell>{aluno.turma}</TableCell>
                  <TableCell>
                    <Badge variant={aluno.status === "Ativo" ? "default" : "outline"}>
                      {aluno.status}
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
                        <DropdownMenuItem onClick={() => openEditModal(aluno)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteAluno(aluno.id)}>Excluir</DropdownMenuItem>
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

export default Alunos;
