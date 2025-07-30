CREATE TABLE IF NOT EXISTS mensalidades (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    mes_referencia VARCHAR(7) NOT NULL, -- Ex: '2025-07'
    data_vencimento DATE NOT NULL,
    data_pagamento DATE, -- Fica nulo até ser pago
    status VARCHAR(50) DEFAULT 'Pendente', -- Ex: 'Pendente', 'Pago', 'Atrasado'
    CONSTRAINT fk_aluno
        FOREIGN KEY(aluno_id)
        REFERENCES alunos(id)
        ON DELETE CASCADE -- Se o aluno for removido, suas mensalidades também são.
);
