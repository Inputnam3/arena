
import { Router } from 'express';
import pool from '../db';

const alunosRouter = Router();

// GET all students
alunosRouter.get('/', async (req, res) => {
  try {
    // The SELECT * will now also return the new columns
    const result = await pool.query('SELECT * FROM alunos ORDER BY nome ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar alunos.' });
  }
});

// POST a new student
alunosRouter.post('/', async (req, res) => {
  const { nome, email, faixa, turma_id, status, matricula, historico_competicoes, medalhas_ouro, medalhas_prata, medalhas_bronze } = req.body;

  if (!matricula) {
    return res.status(400).json({ message: 'O campo matrícula é obrigatório.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO alunos (nome, email, faixa, turma_id, status, matricula, historico_competicoes, medalhas_ouro, medalhas_prata, medalhas_bronze) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [nome, email, faixa, turma_id, status || 'Ativo', matricula, historico_competicoes, medalhas_ouro || 0, medalhas_prata || 0, medalhas_bronze || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    // Specific error for unique violation on matricula or email
    if (err.code === '23505') { // Unique violation error code in PostgreSQL
        return res.status(409).json({ message: 'Erro: Matrícula ou email já cadastrado.', field: err.constraint });
    }
    res.status(500).json({ message: 'Erro ao adicionar aluno.', error: err.message });
  }
});

// PUT (update) a student by ID
alunosRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, faixa, turma_id, status, matricula, historico_competicoes, medalhas_ouro, medalhas_prata, medalhas_bronze } = req.body;
  try {
    const result = await pool.query(
      'UPDATE alunos SET nome = $1, email = $2, faixa = $3, turma_id = $4, status = $5, matricula = $6, historico_competicoes = $7, medalhas_ouro = $8, medalhas_prata = $9, medalhas_bronze = $10 WHERE id = $11 RETURNING *',
      [nome, email, faixa, turma_id, status, matricula, historico_competicoes, medalhas_ouro, medalhas_prata, medalhas_bronze, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    // Specific error for unique violation on matricula or email
    if (err.code === '23505') { // Unique violation error code in PostgreSQL
        return res.status(409).json({ message: 'Erro: Matrícula ou email já cadastrado.', field: err.constraint });
    }
    res.status(500).json({ message: 'Erro ao atualizar aluno.', error: err.message });
  }
});

// DELETE a student by ID
alunosRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM alunos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }
    res.status(204).send(); // No content for successful deletion
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar aluno.', error: err.message });
  }
});

export default alunosRouter;
