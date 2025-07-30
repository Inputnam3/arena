
import { Router } from 'express';
import pool from '../db';

const professoresRouter = Router();

// Middleware de autenticação simulado para professor
// Em um ambiente real, você usaria um JWT e verificaria o papel do usuário
const authenticateProfessor = (req: any, res: any, next: any) => {
  // Para fins de demonstração, vamos assumir que o professor_id é passado no header ou body
  // Em produção, você extrairia o ID do token JWT
  const professorId = req.headers['x-professor-id'] || req.body.professor_id;
  if (professorId) {
    req.professorId = professorId;
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado. Professor não autenticado.' });
  }
};

professoresRouter.use(authenticateProfessor);

// GET - Listar turmas do professor (simulado)
// Em um sistema real, você teria uma tabela de relacionamento professor-turma
professoresRouter.get('/minhas-turmas', async (req: any, res) => {
  try {
    // Por enquanto, retorna todas as turmas. Em um sistema real, filtraria por professor_id
    const result = await pool.query('SELECT * FROM turmas ORDER BY nome ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar turmas do professor.' });
  }
});

// GET - Listar alunos de uma turma específica (para o professor)
professoresRouter.get('/turmas/:turmaId/alunos', async (req, res) => {
  const { turmaId } = req.params;
  try {
    const result = await pool.query('SELECT id, nome, matricula, faixa FROM alunos WHERE turma_id = $1 ORDER BY nome ASC', [turmaId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar alunos da turma.' });
  }
});

// POST/PUT - Adicionar/Atualizar anotação/avaliação de aluno
professoresRouter.post('/avaliar-aluno', async (req: any, res) => {
  const { aluno_id, turma_id, anotacao, nota } = req.body;
  const professor_id = req.professorId; // Obtido do middleware de autenticação

  if (!aluno_id || !professor_id) {
    return res.status(400).json({ message: 'Aluno e Professor são obrigatórios.' });
  }

  try {
    // Tenta atualizar uma avaliação existente
    const updateResult = await pool.query(
      'UPDATE avaliacoes_alunos SET anotacao = $1, nota = $2, data_avaliacao = CURRENT_DATE WHERE aluno_id = $3 AND professor_id = $4 AND (turma_id = $5 OR (turma_id IS NULL AND $5 IS NULL)) RETURNING *',
      [anotacao, nota, aluno_id, professor_id, turma_id]
    );

    if (updateResult.rows.length > 0) {
      return res.json(updateResult.rows[0]);
    }

    // Se não encontrou para atualizar, insere uma nova
    const insertResult = await pool.query(
      'INSERT INTO avaliacoes_alunos (aluno_id, professor_id, turma_id, anotacao, nota) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [aluno_id, professor_id, turma_id, anotacao, nota]
    );
    res.status(201).json(insertResult.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar avaliação/anotação.', error: err.message });
  }
});

// GET - Listar avaliações/anotações de um aluno específico
professoresRouter.get('/aluno/:alunoId/avaliacoes', async (req, res) => {
  const { alunoId } = req.params;
  try {
    const result = await pool.query(
      'SELECT aa.*, p.nome as professor_nome, t.nome as turma_nome FROM avaliacoes_alunos aa JOIN professores p ON aa.professor_id = p.id LEFT JOIN turmas t ON aa.turma_id = t.id WHERE aa.aluno_id = $1 ORDER BY aa.data_avaliacao DESC',
      [alunoId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar avaliações do aluno.' });
  }
});

export default professoresRouter;
