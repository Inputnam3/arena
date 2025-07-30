
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Esquema de validação com Zod
const turmaSchema = z.object({
  nome: z.string().min(3, { message: "O nome da turma deve ter pelo menos 3 caracteres." }),
  horario: z.string().min(1, { message: "O horário é obrigatório." }),
  dias_da_semana: z.string().min(1, { message: "Os dias da semana são obrigatórios." }),
  instrutor: z.string().min(1, { message: "O instrutor é obrigatório." }),
  capacidade: z.coerce.number().min(1, { message: "A capacidade deve ser no mínimo 1." }),
  status: z.string(),
});

interface TurmaFormProps {
  onSubmit: (values: z.infer<typeof turmaSchema>) => void;
  initialData?: z.infer<typeof turmaSchema>;
}

const TurmaForm = ({ onSubmit, initialData }: TurmaFormProps) => {
  const form = useForm<z.infer<typeof turmaSchema>>({
    resolver: zodResolver(turmaSchema),
    defaultValues: initialData || {
      nome: "",
      horario: "",
      dias_da_semana: "",
      instrutor: "",
      capacidade: 1,
      status: "Ativa",
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
              <FormLabel>Nome da Turma</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Judô Infantil" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="horario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 18:00 - 19:00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dias_da_semana"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dias da Semana</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Seg, Qua, Sex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instrutor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instrutor</FormLabel>
              <FormControl>
                <Input placeholder="Nome do instrutor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacidade</FormLabel>
              <FormControl>
                <Input id={field.name} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Ativa">Ativa</SelectItem>
                  <SelectItem value="Inativa">Inativa</SelectItem>
                  <SelectItem value="Lotada">Lotada</SelectItem>
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

export default TurmaForm;
