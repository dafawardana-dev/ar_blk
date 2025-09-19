import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllModul = async (req, res) => {
  try {
    const modul = await prisma.dataModul.findMany();
    res.status(200).json(modul);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getModulById = async (req, res) => {
  const { id } = req.params;
  try {
    const modul = await prisma.dataModul.findUnique({
      where: { id: parseInt(id) },
    });
    if (!modul) {
      return res.status(404).json({ message: 'Modul tidak ditemukan' });
    }
    res.status(200).json(modul);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createModul = async (req, res) => {
  const { judul, deskripsi, tgl, dokumen } = req.body;

  // Validasi: Pastikan `tgl` ada dan bukan string kosong
  if (!tgl) {
    return res.status(400).json({ error: 'Tanggal harus diisi' });
  }

  // Validasi: Pastikan `tgl` adalah tanggal yang valid
  const parsedDate = new Date(tgl);
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: 'Format tanggal tidak valid' });
  }

  
  if (parsedDate < new Date('1980-01-01')) {
    return res.status(400).json({ error: 'Tanggal tidak boleh sebelum tahun 1980' });
  }

  try {
    const newModul = await prisma.modul.create({
      data: {
        judul,
        deskripsi,
        tgl: parsedDate, 
        dokumen,
      },
    });
    res.status(201).json(newModul);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateModul = async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, tgl, dokumen } = req.body;
  try {
    const updatedModul = await prisma.dataModul.update({
      where: { id: parseInt(id) },       
        judul,
        deskripsi,
        tgl: new Date(tgl),
        dokumen,
      
    });
    res.status(200).json(updatedModul);
  } catch (error) {
      res.status(500).json({ error: error.message });    
  }
};

export const deleteModul = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.dataModul.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Modul berhasil dihapus' });
  } catch (error) {
    
      res.status(500).json({ error: error.message });    
  }
};