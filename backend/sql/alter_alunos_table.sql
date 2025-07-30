ALTER TABLE alunos
ADD COLUMN matricula VARCHAR(20) UNIQUE NOT NULL,
ADD COLUMN historico_competicoes TEXT,
ADD COLUMN medalhas_ouro INT DEFAULT 0,
ADD COLUMN medalhas_prata INT DEFAULT 0,
ADD COLUMN medalhas_bronze INT DEFAULT 0;
