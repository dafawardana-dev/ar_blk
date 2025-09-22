
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllArsip = async (req, res) => {
  try {
    const arsip = await prisma.dataArsip.findMany();
    res.status(200).json(arsip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getArsipById = async (req, res) => {
  const { id } = req.params;
  try {
    const arsip = await prisma.dataArsip.findUnique({
      where: { id: parseInt(id) },
    });
    if (!arsip) {
      return res.status(404).json({ message: 'Arsip tidak ditemukan' });
    }
    res.status(200).json(arsip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createArsip = async (req, res) => {
  try {
    const { nomor, judul, deskripsi, tglSurat, pengirim, penerima } = req.body;
    
    if (!tglSurat) {
      return res.status(400).json({ error: "Tanggal Surat wajib diisi" });
    }

    const tanggalSurat = new Date(tglSurat);
    if (isNaN(tanggalSurat.getTime())) {
      return res.status(400).json({ error: "Format tanggal tidak valid" });
    }

    let dokumenPath = null;
    if (req.file) {
      dokumenPath = `/uploads/${req.file.filename}`;
    }

    const newArsip = await prisma.dataArsip.create({
       data :{
        nomor,
        judul,
        deskripsi,
        tglSurat: tanggalSurat,
        pengirim,
        penerima,
        dokumen: dokumenPath,
      },
    });

    res.status(201).json(newArsip);
  } catch (error) {
    console.error("❌ Error creating arsip:", error); 
    res.status(500).json({ error: error.message });
  }
};

export const updateArsip = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomor, judul, deskripsi, tglSurat, pengirim, penerima, dokumen } = req.body;

    const arsipLama = await prisma.dataArsip.findUnique({
      where: { id: parseInt(id) },
    });

     if (!arsipLama) {
      return res.status(404).json({ message: "Data kelas tidak ditemukan" });
    }

    let dokumenPath = arsipLama.dokumen; // Pertahankan dokumen lama
    if (req.file) {
      dokumenPath = `/uploads/${req.file.filename}`;
    }

    const updatedArsip = await prisma.dataArsip.update({
      where: { id: parseInt(id) },
      data: {
        nomor,
        judul,
        deskripsi,
        tglSurat: new Date(tglSurat),
        pengirim,
        penerima,
        dokumen,
      },
    });
    res.status(200).json(updatedArsip);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Arsip tidak ditemukan' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteArsip = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.dataArsip.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Arsip berhasil dihapus' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Arsip tidak ditemukan' });
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
  const fileArsip = file.filename;
  const arsipFile = `/middleware/uploads/${fileArsip}`;
  res.status(200).json({
    message: "File Sucsess Uploaded",
    file: arsipFile,
  });
};
