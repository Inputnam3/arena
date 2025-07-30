
import { useState, useEffect } from "react";
import StatCard from "@/components/ui/StatCard";
import { Users, BarChart, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const StudentDashboardContent = () => {
  return (
    <div 
      className="relative w-full h-full min-h-[calc(100vh-150px)] flex items-center justify-center overflow-hidden rounded-lg"
      style={{
        backgroundImage: `url('/img/dojo-main-bg.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(2px)',
        opacity: 0.7,
        transform: 'scale(1.02)' // Counteract blur shrinking
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div> {/* Overlay for better readability */}
      <div className="relative z-10 text-white text-center p-8 rounded-lg bg-black/60">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo, Aluno!</h1>
        <p className="text-lg">Este é o seu painel de estudante. Em breve, você poderá ver suas informações, turmas e pagamentos aqui.</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const userProfile = localStorage.getItem('userProfile');

  if (userProfile === 'aluno') {
    return <StudentDashboardContent />;
  } else if (userProfile === 'professor') {
    // return <SenseiDashboardContent />;
    return <div>Bem-vindo, Professor! (Dashboard em construção)</div>;
  } else {
    return <div>Carregando dashboard...</div>; // Ou redirecionar para login se não houver perfil
  }
};

export default Dashboard;
