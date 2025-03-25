/*
  Warnings:

  - You are about to alter the column `numero` on the `enderecos` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_enderecos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    CONSTRAINT "enderecos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_enderecos" ("bairro", "cep", "cidade", "id", "numero", "pacienteId", "rua") SELECT "bairro", "cep", "cidade", "id", "numero", "pacienteId", "rua" FROM "enderecos";
DROP TABLE "enderecos";
ALTER TABLE "new_enderecos" RENAME TO "enderecos";
CREATE UNIQUE INDEX "enderecos_pacienteId_key" ON "enderecos"("pacienteId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
