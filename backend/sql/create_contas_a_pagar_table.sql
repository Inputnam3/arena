CREATE TABLE IF NOT EXISTS contas_a_pagar (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100), -- Ex: 'Salário', 'Infraestrutura', 'Marketing'
    data_vencimento DATE NOT NULL,
    data_pagamento DATE, -- Fica nulo até ser pago
    status VARCHAR(50) DEFAULT 'Pendente' -- Ex: 'Pendente', 'Pago', 'Atrasado'
);
