/*
  Warnings:

  - You are about to drop the column `code` on the `password_reset_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code_hash]` on the table `password_reset_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code_hash` to the `password_reset_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "password_reset_tokens_code_key";

-- AlterTable
ALTER TABLE "password_reset_tokens" DROP COLUMN "code",
ADD COLUMN     "code_hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_code_hash_key" ON "password_reset_tokens"("code_hash");
