-- CreateEnum
CREATE TYPE "public"."JenisKelamin" AS ENUM ('LAKI', 'PEREMPUAN');

-- CreateTable
CREATE TABLE "public"."dataKelas" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,
    "jk" "public"."JenisKelamin" NOT NULL,
    "tempatOjt" TEXT NOT NULL,
    "namaKelas" TEXT,
    "sertifikat" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dataKelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dataModul" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "namaKelas" TEXT,
    "deskripsi" TEXT NOT NULL,
    "dokumen" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dataModul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dataArsip" (
    "id" SERIAL NOT NULL,
    "nomor" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "tglSurat" TIMESTAMP(3) NOT NULL,
    "pengirim" TEXT,
    "penerima" TEXT,
    "dokumen" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dataArsip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dataKelas_email_key" ON "public"."dataKelas"("email");
