
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const RelatoriosPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Relatórios</h1>
      <p className="text-muted-foreground">Acesse relatórios detalhados para acompanhar o desempenho da escola.</p>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Relatório de Frequência de Alunos</h3>
            <p className="text-muted-foreground mb-2">Visualize a frequência dos alunos por turma e período.</p>
            <Button>Gerar Relatório</Button>
          </div>
          <Separator />
          <div>
            <h3 className="text-xl font-semibold">Relatório Financeiro Mensal</h3>
            <p className="text-muted-foreground mb-2">Detalhes de receitas e despesas do mês atual e anteriores.</p>
            <Button>Gerar Relatório</Button>
          </div>
          <Separator />
          <div>
            <h3 className="text-xl font-semibold">Relatório de Progresso de Faixas</h3>
            <p className="text-muted-foreground mb-2">Acompanhe o avanço dos alunos nas faixas e identifique necessidades de suporte.</p>
            <Button>Gerar Relatório</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosPage;
