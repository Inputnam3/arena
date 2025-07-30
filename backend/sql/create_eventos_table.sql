CREATE TABLE IF NOT EXISTS eventos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    data_fim TIMESTAMP WITH TIME ZONE,
    tipo VARCHAR(100) NOT NULL, -- Ex: 'Troca de Faixa', 'Competição', 'Ação Interna'
    local VARCHAR(255)
);
