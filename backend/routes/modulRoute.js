
import express from 'express';
import upload from '../middleware/upload.js';
import {
  getAllModul,
  getModulById,
  createModul,
  updateModul,
  deleteModul,
} from '../controllers/modulController.js';

const router = express.Router();

router.post('/', upload.single('dokumen'), createModul);
router.put('/:id', upload.single('dokumen'), updateModul);

router.get('/', getAllModul);
router.get('/:id', getModulById);
router.delete('/:id', deleteModul);

export default router;