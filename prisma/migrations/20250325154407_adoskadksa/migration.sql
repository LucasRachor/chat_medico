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
    CONSTRAINT "enderecos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_enderecos" ("bairro", "cep", "cidade", "id", "numero", "pacienteId", "rua") SELECT "bairro", "cep", "cidade", "id", "numero", "pacienteId", "rua" FROM "enderecos";
DROP TABLE "enderecos";
ALTER TABLE "new_enderecos" RENAME TO "enderecos";
CREATE UNIQUE INDEX "enderecos_pacienteId_key" ON "enderecos"("pacienteId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
