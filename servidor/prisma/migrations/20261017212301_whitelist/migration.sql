/*
  Warnings:

  - You are about to drop the column `Nome` on the `Whitelist` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Whitelist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Whitelist" DROP COLUMN "Nome",
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD CONSTRAINT "Whitelist_pkey" PRIMARY KEY ("id");
