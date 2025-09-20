
import express from 'express';
import {
  getAllArsip,
  getArsipById,
  createArsip,
  updateArsip,
  deleteArsip,
} from '../controllers/arsipController.js';

const router = express.Router();

router.post('/', upload.single('dokumenArsip'), createArsip); 
router.get('/', getAllArsip);
router.get('/:id', getArsipById);
router.put('/:id', updateArsip);
router.delete('/:id', deleteArsip);

export default router;