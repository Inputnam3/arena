import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do transportador de e-mail
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com', // Substitua pelo seu host SMTP
  port: parseInt(process.env.EMAIL_PORT || '587'), // Substitua pela sua porta SMTP
  secure: process.env.EMAIL_SECURE === 'true', // Use true se a porta for 465 (SSL/TLS), false para outras (STARTTLS)
  auth: {
    user: process.env.EMAIL_USER || 'seu_email@example.com', // Substitua pelo seu e-mail
    pass: process.env.EMAIL_PASS || 'sua_senha', // Substitua pela sua senha
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    await transporter.sendMail({
      from: `"Arena Ricardo Santos" <${process.env.EMAIL_USER || 'seu_email@example.com'}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    console.log(`Email enviado para: ${options.to}`);
  } catch (error) {
    console.error(`Erro ao enviar email para ${options.to}:`, error);
  }
};

export const sendPaymentConfirmationEmail = async (alunoEmail: string, alunoNome: string, valor: number, mesReferencia: string) => {
  const subject = 'Confirmação de Pagamento - Arena Ricardo Santos';
  const html = `
    <p>Olá, <strong>${alunoNome}</strong>!</p>
    <p>Confirmamos o recebimento do seu pagamento no valor de <strong>R$ ${valor.toFixed(2).replace('.', ',')}</strong> referente à mensalidade de <strong>${mesReferencia}</strong>.</p>
    <p>Agradecemos a sua confiança e parceria!</p>
    <p>Atenciosamente,</p>
    <p>Equipe Arena Ricardo Santos</p>
  `;
  await sendEmail({ to: alunoEmail, subject, html });
};

export const sendMonthlyReminderEmail = async (alunoEmail: string, alunoNome: string, valor: number, dataVencimento: string) => {
  const subject = 'Lembrete de Mensalidade - Arena Ricardo Santos';
  const html = `
    <p>Olá, <strong>${alunoNome}</strong>!</p>
    <p>Este é um lembrete amigável de que sua mensalidade no valor de <strong>R$ ${valor.toFixed(2).replace('.', ',')}</strong> vencerá em <strong>${dataVencimento}</strong>.</p>
    <p>Por favor, realize o pagamento para evitar interrupções nos seus treinos.</p>
    <p>Atenciosamente,</p>
    <p>Equipe Arena Ricardo Santos</p>
  `;
  await sendEmail({ to: alunoEmail, subject, html });
};

export const sendOverduePaymentEmail = async (alunoEmail: string, alunoNome: string, valor: number, dataVencimento: string) => {
  const subject = 'Mensalidade Atrasada - Arena Ricardo Santos';
  const html = `
    <p>Olá, <strong>${alunoNome}</strong>!</p>
    <p>Sua mensalidade no valor de <strong>R$ ${valor.toFixed(2).replace('.', ',')}</strong>, com vencimento em <strong>${dataVencimento}</strong>, encontra-se em atraso.</p>
    <p>Por favor, regularize sua situação o mais breve possível para evitar a suspensão dos serviços.</p>
    <p>Atenciosamente,</p>
    <p>Equipe Arena Ricardo Santos</p>
  `;
  await sendEmail({ to: alunoEmail, subject, html });
};
