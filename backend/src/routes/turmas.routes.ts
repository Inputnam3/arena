
import { Router } from 'express';
import pool from '../db';

const turmasRouter = Router();

// GET all turmas
turmasRouter.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM turmas ORDER BY nome ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar turmas.' });
  }
});

// POST a new turma
turmasRouter.post('/', async (req, res) => {
  const { nome, horario, dias_da_semana, instrutor, capacidade, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO turmas (nome, horario, dias_da_semana, instrutor, capacidade, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
      , [nome, horario, dias_da_semana, instrutor, capacidade, status || 'Ativa']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar turma.', error: err.message });
  }
});

// PUT (update) a turma by ID
turmasRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, horario, dias_da_semana, instrutor, capacidade, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE turmas SET nome = $1, horario = $2, dias_da_semana = $3, instrutor = $4, capacidade = $5, status = $6 WHERE id = $7 RETURNING *'
      , [nome, horario, dias_da_semana, instrutor, capacidade, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar turma.', error: err.message });
  }
});

// DELETE a turma by ID
turmasRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM turmas WHERE id = $1 RETURNING *'
    , [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Turma não encontrada.' });
    }
    res.status(204).send(); // No content for successful deletion
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar turma.', error: err.message });
  }
});

// GET all students in a specific turma
turmasRouter.get('/:id/alunos', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM alunos WHERE turma_id = $1 ORDER BY nome ASC', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar alunos da turma.' });
  }
});

export default turmasRouter;
