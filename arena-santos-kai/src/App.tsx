import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import HomeRedirect from "./pages/HomeRedirect";
import Layout from "./components/Layout";
import AuthGuard from "./components/AuthGuard";

// Admin Pages
import AdminPage from "./pages/admin/AdminPage";
import AlunosPage from "./pages/admin/AlunosPage";
import ProfessoresPage from "./pages/admin/ProfessoresPage";
import AulasPage from "./pages/admin/AulasPage";
import FinanceiroPage from "./pages/admin/FinanceiroPage";
import ComunicadosPage from "./pages/admin/ComunicadosPage";
import RelatoriosPage from "./pages/admin/RelatoriosPage";
import SettingsPage from "./pages/admin/SettingsPage";

// General Dashboards
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas Protegidas do Admin */}
          <Route path="/admin" element={<AuthGuard allowedProfiles={['admin']} />}>
            <Route element={<Layout />}>
              <Route index element={<AdminPage />} />
              <Route path="alunos" element={<AlunosPage />} />
              <Route path="professores" element={<ProfessoresPage />} />
              <Route path="aulas" element={<AulasPage />} />
              <Route path="financeiro" element={<FinanceiroPage />} />
              <Route path="comunicados" element={<ComunicadosPage />} />
              <Route path="relatorios" element={<RelatoriosPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Rotas Protegidas para Alunos e Professores */}
          <Route path="/dashboard" element={<AuthGuard allowedProfiles={['aluno', 'professor']} />}>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;