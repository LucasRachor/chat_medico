-- CreateTable
CREATE TABLE "atendimentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataAtendimento" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipoAtendimento" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "alternativaId" TEXT NOT NULL,
    "questionarioId" TEXT NOT NULL,
    CONSTRAINT "atendimentos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "atendimentos_alternativaId_fkey" FOREIGN KEY ("alternativaId") REFERENCES "alternativas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "atendimentos_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "questionarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
