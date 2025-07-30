
import { Router } from 'express';
import pool from '../db';
import pdf from 'html-pdf';
import { promisify } from 'util';

const contratosRouter = Router();
const createPdf = promisify(pdf.create);

// POST - Gerar e baixar contrato em PDF
contratosRouter.post('/gerar', async (req, res) => {
  const { aluno_id, tipo_contrato, dados_contrato } = req.body;

  if (!aluno_id || !tipo_contrato || !dados_contrato) {
    return res.status(400).json({ message: 'Dados incompletos para gerar o contrato.' });
  }

  try {
    // Buscar dados do aluno para o contrato
    const alunoResult = await pool.query('SELECT nome, matricula, email, faixa FROM alunos WHERE id = $1', [aluno_id]);
    if (alunoResult.rows.length === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado.' });
    }
    const aluno = alunoResult.rows[0];

    // Montar o conteúdo HTML do contrato
    // Este é um exemplo básico. Você pode expandir com mais campos e formatação.
    const htmlContent = `
      <h1>Contrato de ${tipo_contrato} - Arena Ricardo Santos</h1>
      <p><strong>Aluno:</strong> ${aluno.nome} (Matrícula: ${aluno.matricula})</p>
      <p><strong>Email:</strong> ${aluno.email}</p>
      <p><strong>Faixa:</strong> ${aluno.faixa}</p>
      <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
      <hr>
      <h2>Termos do Contrato:</h2>
      <p>${dados_contrato.termos || '[Termos do contrato aqui]'}</p>
      <p><strong>Valor:</strong> R$ ${dados_contrato.valor ? dados_contrato.valor.toFixed(2).replace('.', ',') : '0,00'}</p>
      <p><strong>Duração:</strong> ${dados_contrato.duracao || '[Duração do contrato]'}</p>
      <br><br>
      <p>___________________________________</p>
      <p>Assinatura do Aluno</p>
      <br><br>
      <p>___________________________________</p>
      <p>Assinatura da Arena Ricardo Santos</p>
    `;

    // Gerar o PDF
    const options = { format: 'A4', orientation: 'portrait' };
    const pdfBuffer = await createPdf(htmlContent, options);

    // Salvar registro do contrato no banco de dados
    await pool.query(
      'INSERT INTO contratos (aluno_id, tipo_contrato, conteudo_gerado) VALUES ($1, $2, $3)',
      [aluno_id, tipo_contrato, htmlContent]
    );

    // Enviar o PDF como resposta
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="contrato_${aluno.matricula}_${tipo_contrato}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao gerar contrato.', error: err.message });
  }
});

export default contratosRouter;
