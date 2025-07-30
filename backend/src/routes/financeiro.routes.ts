
import { Router } from 'express';
import pool from '../db';
import { sendPaymentConfirmationEmail } from '../utils/emailService';

const financeiroRouter = Router();

// --- ROTAS PARA CONTAS A PAGAR ---

// GET all contas a pagar
financeiroRouter.get('/pagar', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contas_a_pagar ORDER BY data_vencimento ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar contas a pagar.' });
  }
});

// POST a new conta a pagar
financeiroRouter.post('/pagar', async (req, res) => {
  const { descricao, valor, categoria, data_vencimento, data_pagamento, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contas_a_pagar (descricao, valor, categoria, data_vencimento, data_pagamento, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [descricao, valor, categoria, data_vencimento, data_pagamento, status || 'Pendente']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar conta a pagar.', error: err.message });
  }
});

// PUT (update) a conta a pagar by ID
financeiroRouter.put('/pagar/:id', async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, categoria, data_vencimento, data_pagamento, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE contas_a_pagar SET descricao = $1, valor = $2, categoria = $3, data_vencimento = $4, data_pagamento = $5, status = $6 WHERE id = $7 RETURNING *',
      [descricao, valor, categoria, data_vencimento, data_pagamento, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Conta a pagar não encontrada.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar conta a pagar.', error: err.message });
  }
});

// DELETE a conta a pagar by ID
financeiroRouter.delete('/pagar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM contas_a_pagar WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Conta a pagar não encontrada.' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar conta a pagar.', error: err.message });
  }
});

// --- ROTAS PARA MENSALIDADES (CONTAS A RECEBER) ---

// GET all mensalidades
financeiroRouter.get('/mensalidades', async (req, res) => {
  try {
    // Join with alunos to get student's name
    const result = await pool.query(
      'SELECT m.*, a.nome as aluno_nome FROM mensalidades m JOIN alunos a ON m.aluno_id = a.id ORDER BY m.data_vencimento ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar mensalidades.' });
  }
});

// POST a new mensalidade
financeiroRouter.post('/mensalidades', async (req, res) => {
  const { aluno_id, valor, mes_referencia, data_vencimento, data_pagamento, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO mensalidades (aluno_id, valor, mes_referencia, data_vencimento, data_pagamento, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [aluno_id, valor, mes_referencia, data_vencimento, data_pagamento, status || 'Pendente']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao adicionar mensalidade.', error: err.message });
  }
});

// PUT (update) a mensalidade by ID
financeiroRouter.put('/mensalidades/:id', async (req, res) => {
  const { id } = req.params;
  const { aluno_id, valor, mes_referencia, data_vencimento, data_pagamento, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE mensalidades SET aluno_id = $1, valor = $2, mes_referencia = $3, data_vencimento = $4, data_pagamento = $5, status = $6 WHERE id = $7 RETURNING *',
      [aluno_id, valor, mes_referencia, data_vencimento, data_pagamento, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mensalidade não encontrada.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar mensalidade.', error: err.message });
  }
});

// PUT (update) a mensalidade by ID
financeiroRouter.put('/mensalidades/:id', async (req, res) => {
  const { id } = req.params;
  const { aluno_id, valor, mes_referencia, data_vencimento, data_pagamento, status } = req.body;
  try {
    const oldMensalidade = await pool.query('SELECT * FROM mensalidades WHERE id = $1', [id]);
    const result = await pool.query(
      'UPDATE mensalidades SET aluno_id = $1, valor = $2, mes_referencia = $3, data_vencimento = $4, data_pagamento = $5, status = $6 WHERE id = $7 RETURNING *',
      [aluno_id, valor, mes_referencia, data_vencimento, data_pagamento, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mensalidade não encontrada.' });
    }

    // Check if status changed to 'Pago' and it wasn't 'Pago' before
    if (status === 'Pago' && oldMensalidade.rows[0].status !== 'Pago') {
      // Fetch student details to send email
      const alunoResult = await pool.query('SELECT nome, email FROM alunos WHERE id = $1', [aluno_id]);
      if (alunoResult.rows.length > 0) {
        const aluno = alunoResult.rows[0];
        await sendPaymentConfirmationEmail(aluno.email, aluno.nome, valor, mes_referencia);
      }
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar mensalidade.', error: err.message });
  }
});

// DELETE a mensalidade by ID
financeiroRouter.delete('/mensalidades/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM mensalidades WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mensalidade não encontrada.' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar mensalidade.', error: err.message });
  }
});


export default financeiroRouter;
