
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Zod validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
  userType: z.enum(['aluno', 'professor', 'admin'], { message: "Por favor, selecione o tipo de usuário." }),
});

export type UserProfile = z.infer<typeof formSchema>['userType'];

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Mock login for admin
    if (values.email === "admin@example.com" && values.password === "admin" && values.userType === "admin") {
      toast({ title: "Login bem-sucedido!", description: "Redirecionando..." });
      localStorage.setItem('userToken', 'fake-admin-token');
      localStorage.setItem('userProfile', 'admin');
      navigate("/admin");
      return;
    }

    // Mock login for aluno
    if (values.email === "aluno@example.com" && values.password === "aluno" && values.userType === "aluno") {
      toast({ title: "Login bem-sucedido!", description: "Redirecionando..." });
      localStorage.setItem('userToken', 'fake-aluno-token');
      localStorage.setItem('userProfile', 'aluno');
      navigate("/dashboard");
      return;
    }

    // Mock login for professor
    if (values.email === "professor@example.com" && values.password === "professor" && values.userType === "professor") {
      toast({ title: "Login bem-sucedido!", description: "Redirecionando..." });
      localStorage.setItem('userToken', 'fake-professor-token');
      localStorage.setItem('userProfile', 'professor');
      navigate("/dashboard");
      return;
    }

    // Original backend login (will only run if mock logins don't match)
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email: values.email,
        password: values.password,
      });
      
      toast({ title: "Login bem-sucedido!", description: "Redirecionando..." });
      
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userProfile', response.data.profile);

      navigate("/dashboard");

    } catch (error) {
      let message = "Ocorreu um erro no login.";
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.message || message;
      }
      toast({ title: "Erro de Autenticação", description: message, variant: "destructive" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">ACESSO RESTRITO</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Input placeholder="Usuário ou E-mail" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Input type="password" placeholder="Senha" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <Label>Entrar como:</Label>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="aluno" />
                        <Label className="font-normal">Pais e Alunos</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="professor" />
                        <Label className="font-normal">Professores e Administrativo</Label>
                      </FormItem>
                       <FormItem className="flex items-center space-x-3 space-y-0">
                        <RadioGroupItem value="admin" />
                        <Label className="font-normal">Administrador</Label>
                      </FormItem>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Entrando...' : 'ENTRAR'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
