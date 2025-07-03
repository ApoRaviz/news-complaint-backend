import { Router } from 'express';
import {
  getAllResidents,
  createResident,
  updateResident,
  deleteResident
} from '../controllers/residentsController';

const router = Router();

router.get('/', getAllResidents);
router.post('/', createResident);
router.put('/:id', updateResident);
router.delete('/:id', deleteResident);

export default router;
