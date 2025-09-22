
import express from 'express';
import upload from '../middleware/upload.js';
import {
  getAllArsip,
  getArsipById,
  createArsip,
  updateArsip,
  deleteArsip,
} from '../controllers/arsipController.js';

const router = express.Router();

router.post('/', upload.single('dokumen'), createArsip); 
router.put('/:id', upload.single('dokumen'), updateArsip); 
router.get('/', getAllArsip);
router.get('/:id', getArsipById);
router.delete('/:id', deleteArsip);

export default router;