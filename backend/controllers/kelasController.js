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
export const updateKelas = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, noHp, jk, tempatOjt, namaKelas, sertifikat } = req.body;
    const updatedKelas = await prisma.dataKelas.update({
      where: { id: parseInt(id) },
      data: {
        nama,
        email,
        noHp,
        jk,
        tempatOjt,
        namaKelas,
        sertifikat,
      },
    });
    res.status(200).json(updatedKelas);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Data kelas tidak ditemukan" });
    } else if (error.code === "P2002") {
      res.status(400).json({ message: "Email sudah terdaftar" });
    } else {
      res.status(500).json({ error: error.message });
    }
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
  const pathFile = `/middleware/uploads/${fileSertif}`;
  res.status(200).json({
    message: "File Sucsess Uploaded",
    file: pathFile,
  });
};
