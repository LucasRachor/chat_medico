-- CreateEnum
CREATE TYPE "Role" AS ENUM ('medico', 'enfermeiro', 'paciente', 'admin');

-- CreateTable
CREATE TABLE "equipe_medica" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "CRM" TEXT,
    "coren" TEXT,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "equipe_medica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cpf" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "grauDeInstrucao" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "idade" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'paciente',

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questionarios" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pergunta" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "peso" INTEGER NOT NULL,
    "equipeMedicaId" TEXT NOT NULL,

    CONSTRAINT "questionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alternativas" (
    "id" TEXT NOT NULL,
    "alternativa" TEXT NOT NULL,
    "peso" INTEGER NOT NULL,
    "questionarioId" TEXT NOT NULL,

    CONSTRAINT "alternativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "remetenteId" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atendimentos" (
    "id" TEXT NOT NULL,
    "dataAtendimento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipoAtendimento" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "temperatura" TEXT NOT NULL,
    "pressaoArterial" TEXT NOT NULL,

    CONSTRAINT "atendimentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respostas" (
    "id" TEXT NOT NULL,
    "atendimentoId" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,

    CONSTRAINT "respostas_pkey" PRIMARY KEY ("id")
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

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questionarios" ADD CONSTRAINT "questionarios_equipeMedicaId_fkey" FOREIGN KEY ("equipeMedicaId") REFERENCES "equipe_medica"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alternativas" ADD CONSTRAINT "alternativas_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "questionarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atendimentos" ADD CONSTRAINT "atendimentos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "atendimentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
