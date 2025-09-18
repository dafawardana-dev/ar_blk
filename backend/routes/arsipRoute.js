
import express from 'express';
import {
  getAllArsip,
  getArsipById,
  createArsip,
  updateArsip,
  deleteArsip,
} from '../controllers/arsipController.js';

const router = express.Router();

router.get('/', getAllArsip);
router.get('/:id', getArsipById);
router.post('/', createArsip);
router.put('/:id', updateArsip);
router.delete('/:id', deleteArsip);

export default router;