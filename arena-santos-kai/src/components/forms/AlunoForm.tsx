
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Esquema de validação com Zod
const alunoSchema = z.object({
  nome: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  faixa: z.string().min(1, { message: "Selecione uma faixa." }),
  turma: z.string().min(1, { message: "Selecione uma turma." }),
});

interface AlunoFormProps {
  onSubmit: (values: z.infer<typeof alunoSchema>) => void;
  initialData?: z.infer<typeof alunoSchema>;
}

const AlunoForm = ({ onSubmit, initialData }: AlunoFormProps) => {
  const form = useForm<z.infer<typeof alunoSchema>>({
    resolver: zodResolver(alunoSchema),
    defaultValues: initialData || {
      nome: "",
      email: "",
      faixa: "Branca",
      turma: "Iniciante A",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Nome do aluno" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input id={field.name} placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="faixa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faixa</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder="Selecione a faixa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Branca">Branca</SelectItem>
                  <SelectItem value="Azul">Azul</SelectItem>
                  <SelectItem value="Roxa">Roxa</SelectItem>
                  <SelectItem value="Marrom">Marrom</SelectItem>
                  <SelectItem value="Preta">Preta</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="turma"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Turma</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder="Selecione a turma" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Iniciante A">Iniciante A</SelectItem>
                  <SelectItem value="Iniciante B">Iniciante B</SelectItem>
                  <SelectItem value="Intermediário A">Intermediário A</SelectItem>
                  <SelectItem value="Intermediário B">Intermediário B</SelectItem>
                  <SelectItem value="Avançado">Avançado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
};

export default AlunoForm;
