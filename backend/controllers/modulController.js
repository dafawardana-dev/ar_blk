// src/controllers/modulController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET semua data modul
export const getAllModul = async (req, res) => {
  try {
    const modul = await prisma.dataModul.findMany();
    res.status(200).json(modul);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET modul by ID
export const getModulById = async (req, res) => {
  const { id } = req.params;
  try {
    const modul = await prisma.dataModul.findUnique({
      where: { id: parseInt(id) },
    });
    if (!modul) {
      return res.status(404).json({ message: "Data modul tidak ditemukan" });
    }
    res.status(200).json(modul);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST create modul baru
export const createModul = async (req, res) => {
  try {
    const { judul, deskripsi, namaKelas } = req.body;

    let dokumenPath = null;
    if (req.file) {
      dokumenPath = `/uploads/${req.file.filename}`;
    }

    if (!judul || !deskripsi) {
      return res.status(400).json({ error: "Judul dan deskripsi wajib diisi" });
    }

    const newModul = await prisma.dataModul.create({
      data: {
        judul,
        deskripsi,
        namaKelas,
        // createdAt: new Date(),
        dokumen: dokumenPath,
      },
    });

    res.status(201).json(newModul);
  } catch (error) {
    console.error("Error creating modul:", error);
    res.status(400).json({ error: error.message });
  }
};

export const updateModul = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, deskripsi, namaKelas } = req.body;

    // Ambil data lama
    const modulLama = await prisma.dataModul.findUnique({
      where: { id: parseInt(id) },
    });

    if (!modulLama) {
      return res.status(404).json({ message: "Data modul tidak ditemukan" });
    }

    // Handle file upload
    let dokumenPath = modulLama.dokumen; // Pertahankan dokumen lama
    if (req.file) {
      dokumenPath = `/uploads/${req.file.filename}`;
    }

    const updatedModul = await prisma.dataModul.update({
      where: { id: parseInt(id) },
       data :{
        judul,
        deskripsi,
        namaKelas,
        dokumen: dokumenPath,
      },
    });

    res.status(200).json(updatedModul);
  } catch (error) {
    console.error("❌ ERROR UPDATE MODUL:", error); 
    res.status(500).json({ error: error.message });
  }
};

// DELETE modul
export const deleteModul = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.dataModul.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Data modul berhasil dihapus" });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Data modul tidak ditemukan" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// Handler upload file (opsional, jika ingin endpoint terpisah)
export const fileUpload = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(404).json({
      message: "File Not Found",
    });
  }
  const filePath = file.filename;
  const pathFile = `/middleware/uploads/${filePath}`;
  res.status(200).json({
    message: "File berhasil diupload",
    file: pathFile,
  });
};
