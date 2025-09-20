/*
  Warnings:

  - You are about to drop the column `tgl` on the `datamodul` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `datamodul` DROP COLUMN `tgl`,
    ADD COLUMN `namaKelas` VARCHAR(191) NULL;
