
import { Router } from 'express';
import pool from '../db';

const eventosRouter = Router();

// --- ROTAS PARA EVENTOS ---

// GET all eventos
eventosRouter.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM eventos ORDER BY data_inicio ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar eventos.' });
  }
});

// POST a new evento
eventosRouter.post('/', async (req, res) => {
  const { titulo, descricao, data_inicio, data_fim, tipo, local } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO eventos (titulo, descricao, data_inicio, data_fim, tipo, local) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [titulo, descricao, data_inicio, data_fim, tipo, local]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar evento.', error: err.message });
  }
});

// PUT (update) an event by ID
eventosRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, data_inicio, data_fim, tipo, local } = req.body;
  try {
    const result = await pool.query(
      'UPDATE eventos SET titulo = $1, descricao = $2, data_inicio = $3, data_fim = $4, tipo = $5, local = $6 WHERE id = $7 RETURNING *',
      [titulo, descricao, data_inicio, data_fim, tipo, local, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar evento.', error: err.message });
  }
});

// DELETE an event by ID
eventosRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM eventos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado.' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar evento.', error: err.message });
  }
});


export default eventosRouter;
