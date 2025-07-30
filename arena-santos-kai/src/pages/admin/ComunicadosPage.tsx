
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ComunicadosPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Enviar Comunicados</h1>
      <p className="text-muted-foreground">Crie e envie avisos e comunicados importantes para alunos, pais e professores.</p>

      <Card>
        <CardHeader>
          <CardTitle>Novo Comunicado</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="comunicado-titulo">Título do Comunicado</Label>
              <Input id="comunicado-titulo" placeholder="Ex: Feriado, Evento, Nova Turma" />
            </div>
            <div>
              <Label htmlFor="comunicado-mensagem">Mensagem</Label>
              <Textarea id="comunicado-mensagem" rows={5} placeholder="Escreva o conteúdo do comunicado aqui..." />
            </div>
            <div>
              <Label htmlFor="comunicado-destinatarios">Destinatários</Label>
              <Select>
                <SelectTrigger id="comunicado-destinatarios">
                  <SelectValue placeholder="Selecione o público" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos (Alunos, Pais e Professores)</SelectItem>
                  <SelectItem value="alunos-pais">Apenas Alunos e Pais</SelectItem>
                  <SelectItem value="professores">Apenas Professores</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">ENVIAR COMUNICADO</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComunicadosPage;
