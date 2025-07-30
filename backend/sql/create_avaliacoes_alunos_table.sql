CREATE TABLE IF NOT EXISTS avaliacoes_alunos (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER NOT NULL,
    professor_id INTEGER NOT NULL,
    turma_id INTEGER,
    data_avaliacao DATE DEFAULT CURRENT_DATE,
    anotacao TEXT,
    nota INTEGER,
    CONSTRAINT fk_aluno_avaliacao
        FOREIGN KEY(aluno_id)
        REFERENCES alunos(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_professor_avaliacao
        FOREIGN KEY(professor_id)
        REFERENCES professores(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_turma_avaliacao
        FOREIGN KEY(turma_id)
        REFERENCES turmas(id)
        ON DELETE SET NULL
);
