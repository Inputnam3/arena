
import express from 'express';
import cors from 'cors';
import pool from './db';
import authRouter from './routes/auth.routes';
import alunosRouter from './routes/alunos.routes';
import turmasRouter from './routes/turmas.routes';
import financeiroRouter from './routes/financeiro.routes';
import eventosRouter from './routes/eventos.routes';
import contratosRouter from './routes/contratos.routes';
import professoresRouter from './routes/professores.routes';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/alunos', alunosRouter);
app.use('/api/turmas', turmasRouter);
app.use('/api/financeiro', financeiroRouter);
app.use('/api/eventos', eventosRouter);
app.use('/api/contratos', contratosRouter);
app.use('/api/professores', professoresRouter);

app.get('/', (req, res) => {
  res.send('Servidor do Arena Ricardo Santos está no ar!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
