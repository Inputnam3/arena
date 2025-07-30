
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis de ambiente do .env

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

pool.on('connect', () => {
  console.log('Conectado ao banco de dados PostgreSQL!');
});

pool.on('error', (err) => {
  console.error('Erro na conexão com o banco de dados:', err);
  process.exit(-1); // Encerra o processo em caso de erro crítico
});

export default pool;
