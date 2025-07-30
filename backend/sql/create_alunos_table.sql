
CREATE TABLE IF NOT EXISTS alunos (
    id SERIAL PRIMARY KEY,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    faixa VARCHAR(50) NOT NULL,
    turma VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Ativo',
    historico_competicoes TEXT,
    medalhas_ouro INT DEFAULT 0,
    medalhas_prata INT DEFAULT 0,
    medalhas_bronze INT DEFAULT 0
);
