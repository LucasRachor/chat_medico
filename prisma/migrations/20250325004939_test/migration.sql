/*
  Warnings:

  - You are about to alter the column `data_nascimento` on the `pacientes` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `idade` on the `pacientes` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pacientes" (
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
    "data_nascimento" DATETIME NOT NULL,
    "idade" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'paciente'
);
INSERT INTO "new_pacientes" ("cpf", "criadoEm", "data_nascimento", "email", "genero", "grau_de_instrucao", "id", "idade", "nome_completo", "password", "role", "telefone", "username") SELECT "cpf", "criadoEm", "data_nascimento", "email", "genero", "grau_de_instrucao", "id", "idade", "nome_completo", "password", "role", "telefone", "username" FROM "pacientes";
DROP TABLE "pacientes";
ALTER TABLE "new_pacientes" RENAME TO "pacientes";
CREATE UNIQUE INDEX "pacientes_cpf_key" ON "pacientes"("cpf");
CREATE UNIQUE INDEX "pacientes_username_key" ON "pacientes"("username");
CREATE UNIQUE INDEX "pacientes_telefone_key" ON "pacientes"("telefone");
CREATE UNIQUE INDEX "pacientes_email_key" ON "pacientes"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
