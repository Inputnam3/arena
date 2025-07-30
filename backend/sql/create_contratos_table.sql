CREATE TABLE IF NOT EXISTS contratos (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER NOT NULL,
    data_geracao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    tipo_contrato VARCHAR(100) NOT NULL,
    conteudo_gerado TEXT,
    CONSTRAINT fk_aluno_contrato
        FOREIGN KEY(aluno_id)
        REFERENCES alunos(id)
        ON DELETE CASCADE
);
