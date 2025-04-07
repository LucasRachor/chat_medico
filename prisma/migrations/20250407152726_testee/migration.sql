-- CreateTable
CREATE TABLE "equipe_medica" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "CRM" TEXT,
    "coren" TEXT,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cpf" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "grauDeInstrucao" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "idade" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'paciente'
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    CONSTRAINT "enderecos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "questionarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pergunta" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "peso" INTEGER NOT NULL,
    "equipeMedicaId" TEXT NOT NULL,
    CONSTRAINT "questionarios_equipeMedicaId_fkey" FOREIGN KEY ("equipeMedicaId") REFERENCES "equipe_medica" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "alternativas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "alternativa" TEXT NOT NULL,
    "peso" INTEGER NOT NULL,
    "questionarioId" TEXT NOT NULL,
    CONSTRAINT "alternativas_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "questionarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sala" TEXT NOT NULL,
    "remetenteId" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "atendimentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataAtendimento" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipoAtendimento" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "alternativaId" TEXT NOT NULL,
    "questionarioId" TEXT NOT NULL,
    "temperatura" TEXT NOT NULL,
    "pressaoArterial" TEXT NOT NULL,
    CONSTRAINT "atendimentos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "atendimentos_alternativaId_fkey" FOREIGN KEY ("alternativaId") REFERENCES "alternativas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "atendimentos_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "questionarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "equipe_medica_username_key" ON "equipe_medica"("username");

-- CreateIndex
CREATE UNIQUE INDEX "equipe_medica_CRM_key" ON "equipe_medica"("CRM");

-- CreateIndex
CREATE UNIQUE INDEX "equipe_medica_coren_key" ON "equipe_medica"("coren");

-- CreateIndex
CREATE UNIQUE INDEX "equipe_medica_email_key" ON "equipe_medica"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_cpf_key" ON "pacientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_username_key" ON "pacientes"("username");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_telefone_key" ON "pacientes"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_email_key" ON "pacientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_pacienteId_key" ON "enderecos"("pacienteId");

-- CreateIndex
CREATE INDEX "chat_messages_sala_idx" ON "chat_messages"("sala");
