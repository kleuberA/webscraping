-- CreateTable
CREATE TABLE "Cripto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "marketPrice" TEXT NOT NULL,
    "alterar" TEXT NOT NULL,
    "porcentagemAlteracao" TEXT NOT NULL,
    "capitalizacaoDeMercado" TEXT NOT NULL,
    "volumeEmMoedaDesdeMeiaNoite" TEXT NOT NULL,
    "volumeEmMoeda24Horas" TEXT NOT NULL,
    "volumeTotalDeTodasMoedas" TEXT NOT NULL,
    "dinheiroCirculante" TEXT NOT NULL,

    CONSTRAINT "Cripto_pkey" PRIMARY KEY ("id")
);
