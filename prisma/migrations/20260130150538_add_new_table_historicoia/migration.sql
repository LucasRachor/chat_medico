-- AlterTable
ALTER TABLE "atendimentos" ALTER COLUMN "classificacaoRisco" SET DEFAULT '';

-- CreateTable
CREATE TABLE "historico_ia" (
    "id" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atendimentoId" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "mensagem" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "tipo_retorno" INTEGER NOT NULL,

    CONSTRAINT "historico_ia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "historico_ia" ADD CONSTRAINT "historico_ia_atendimentoId_fkey" FOREIGN KEY ("atendimentoId") REFERENCES "atendimentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
