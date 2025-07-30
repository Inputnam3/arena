
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, Banknote, ClipboardList, DollarSign } from "lucide-react";

const FinanceiroPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financeiro</h1>

      {/* Resumo Financeiro */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-muted-foreground">Receita Mensal</p>
              <p className="text-2xl font-bold text-green-600">R$ 15.000,00</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-muted-foreground">Despesas Mensais</p>
              <p className="text-2xl font-bold text-red-600">R$ 8.000,00</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-muted-foreground">Lucro Líquido</p>
              <p className="text-2xl font-bold">R$ 7.000,00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="h-24 text-lg"><Wallet className="w-8 h-8 mr-4" />Contas a Pagar</Button>
          <Button className="h-24 text-lg"><Banknote className="w-8 h-8 mr-4" />Contas a Receber</Button>
          <Button className="h-24 text-lg"><ClipboardList className="w-8 h-8 mr-4" />Organizar Despesas</Button>
          <Button className="h-24 text-lg"><DollarSign className="w-8 h-8 mr-4" />Controle de Caixa</Button>
      </div>

      {/* Últimas Transações */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Transações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Tipo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>20/07/2025</TableCell>
                <TableCell>Mensalidade João Silva</TableCell>
                <TableCell className="text-green-600">+R$ 180,00</TableCell>
                <TableCell>Receita</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>18/07/2025</TableCell>
                <TableCell>Pagamento Aluguel</TableCell>
                <TableCell className="text-red-600">-R$ 2.500,00</TableCell>
                <TableCell>Despesa</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceiroPage;
