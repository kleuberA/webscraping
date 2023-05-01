/*
  Warnings:

  - The `volumeTotalDeTodasMoedas` column on the `Cripto` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Cripto" DROP COLUMN "volumeTotalDeTodasMoedas",
ADD COLUMN     "volumeTotalDeTodasMoedas" TEXT[];
