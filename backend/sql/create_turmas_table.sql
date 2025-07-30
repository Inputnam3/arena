
CREATE TABLE IF NOT EXISTS turmas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    horario VARCHAR(100) NOT NULL,
    dias_da_semana VARCHAR(255) NOT NULL, -- Ex: 'Seg, Qua, Sex'
    instrutor VARCHAR(255),
    capacidade INTEGER,
    status VARCHAR(50) DEFAULT 'Ativa' -- Ex: 'Ativa', 'Inativa', 'Lotada'
);
