/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Whitelist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('PEDENTE', 'APROVADA', 'REJEITADA');

-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('DONO', 'DIRETOR', 'MODERADOR');

-- AlterTable
ALTER TABLE "Whitelist" ADD COLUMN     "estadow" "Estado" NOT NULL DEFAULT 'PEDENTE';

-- CreateTable
CREATE TABLE "Administradores" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhahas" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "criadoPor" TEXT NOT NULL,
    "cargo" "Cargo" NOT NULL DEFAULT 'MODERADOR',

    CONSTRAINT "Administradores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administradores_id_key" ON "Administradores"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Administradores_user_key" ON "Administradores"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Administradores_email_key" ON "Administradores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Whitelist_id_key" ON "Whitelist"("id");
