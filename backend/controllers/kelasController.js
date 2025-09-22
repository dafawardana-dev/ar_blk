import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET semua data kelas
export const getAllKelas = async (req, res) => {
  try {
    const kelas = await prisma.dataKelas.findMany();
    res.status(200).json(kelas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET kelas by ID
export const getKelasById = async (req, res) => {
  const { id } = req.params;
  try {
    const kelas = await prisma.dataKelas.findUnique({
      where: { id: parseInt(id) },
    });
    if (!kelas) {
      return res.status(404).json({ message: "Data kelas tidak ditemukan" });
    }
    res.status(200).json(kelas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST create kelas baru
export const createKelas = async (req, res) => {
  try {
    const { nama, email, noHp, jk, tempatOjt, namaKelas } = req.body;

    // src/controllers/kelasController.js
    let sertifikatPath = null;
    if (req.file) {
      sertifikatPath = `/uploads/${req.file.filename}`; 
    } // Simpan path relatif
    const newKelas = await prisma.dataKelas.create({
      data: {
        nama,
        email,
        noHp,
        jk,
        tempatOjt,
        namaKelas,
        sertifikat: sertifikatPath, // Simpan ke database
      },
    });

    res.status(201).json(newKelas);
  } catch (error) {
    console.error("Error creating kelas:", error); // Log error untuk debugging
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email sudah terdaftar" });
    }
    res.status(400).json({ error: error.message });
  }
};

// PUT update kelas
// src/controllers/kelasController.js
export const updateKelas = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, noHp, jk, tempatOjt, namaKelas } = req.body;

    // Ambil data lama
    const kelasLama = await prisma.dataKelas.findUnique({
      where: { id: parseInt(id) },
    });

    if (!kelasLama) {
      return res.status(404).json({ message: "Data kelas tidak ditemukan" });
    }

    // Handle file upload
    let sertifikatPath = kelasLama.sertifikat; // Pertahankan jika tidak ada file baru
    if (req.file) {
      sertifikatPath = `/uploads/${req.file.filename}`;
    }

    const updatedKelas = await prisma.dataKelas.update({
      where: { id: parseInt(id) },
       data : {

        nama,
        email,
        noHp,
        jk,
        tempatOjt,
        namaKelas,
        sertifikat: sertifikatPath,
      },
    });
    res.status(200).json(updatedKelas);
  } catch (error) {
    console.error("❌ ERROR UPDATE KELAS:", error); // ✅ LOG INI WAJIB!

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Data kelas tidak ditemukan' });
    } else if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email sudah terdaftar' });
    }

    res.status(500).json({ error: 'Terjadi kesalahan di server' });
  }
};

// DELETE kelas
export const deleteKelas = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.dataKelas.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Data kelas berhasil dihapus" });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Data kelas tidak ditemukan" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const fileUpload = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(404).json({
      message: "File Not Found",
    });
  }
  const fileSertif = file.filename;
  const pathFile = `/uploads/${fileSertif}`;
  res.status(200).json({
    message: "File Successfully Uploaded",
    file: pathFile,
  });
};