-- 1. Adicionar a coluna turma_id na tabela alunos
ALTER TABLE alunos
ADD COLUMN turma_id INTEGER;

-- 2. Criar a chave estrangeira para relacionar alunos e turmas
ALTER TABLE alunos
ADD CONSTRAINT fk_turma
FOREIGN KEY (turma_id)
REFERENCES turmas(id)
ON DELETE SET NULL; -- Se uma turma for deletada, o aluno fica sem turma (turma_id = NULL)

-- 3. (Opcional) Se desejar, copie os dados da coluna antiga para a nova
-- UPDATE alunos SET turma_id = (SELECT id FROM turmas WHERE nome = alunos.turma);

-- 4. (Opcional) Remover a coluna antiga 'turma'
-- ALTER TABLE alunos
-- DROP COLUMN turma;
