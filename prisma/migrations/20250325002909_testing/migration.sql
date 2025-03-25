-- CreateTable
CREATE TABLE "medicos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "CRM" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'medico'
);

-- CreateTable
CREATE TABLE "enfermeiros" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "coren" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'enfermeiro'
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cpf" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "grau_de_instrucao" TEXT NOT NULL,
    "data_nascimento" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'paciente'
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    CONSTRAINT "enderecos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "medicos_username_key" ON "medicos"("username");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_CRM_key" ON "medicos"("CRM");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_email_key" ON "medicos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "enfermeiros_username_key" ON "enfermeiros"("username");

-- CreateIndex
CREATE UNIQUE INDEX "enfermeiros_coren_key" ON "enfermeiros"("coren");

-- CreateIndex
CREATE UNIQUE INDEX "enfermeiros_email_key" ON "enfermeiros"("email");

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
