
import express from 'express';
import upload from '../middleware/upload.js';
import {
  getAllKelas,
  getKelasById,
  createKelas,
  updateKelas,
  deleteKelas,
} from '../controllers/kelasController.js';

const router = express.Router();

router.post('/', upload.single('sertifikat'), createKelas);
router.put('/:id', upload.single('sertifikat'), updateKelas);
router.get('/', getAllKelas);
router.get('/:id', getKelasById);
router.delete('/:id', deleteKelas);


export default router;