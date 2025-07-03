// -----------------------------
// Residents API routes (CRUD)
// เส้นทาง API สำหรับ residents (CRUD)
// -----------------------------

import { Router } from 'express';
import {
  getAllResidents,    // GET /api/residents
  createResident,     // POST /api/residents
  updateResident,     // PUT /api/residents/:id
  deleteResident,     // DELETE /api/residents/:id
  getAllResidents2    // GET /api/residents/all2 (test Supabase REST API)
} from '../controllers/residentsController';

const router = Router();

router.get('/', getAllResidents);      // ดึงข้อมูลผู้อยู่อาศัยทั้งหมด
router.post('/', createResident);      // สร้างผู้อยู่อาศัยใหม่
router.put('/:id', updateResident);    // อัปเดตข้อมูลผู้อยู่อาศัย
router.delete('/:id', deleteResident); // ลบผู้อยู่อาศัย
router.get('/all2', getAllResidents2); // GET /api/residents/all2 (test Supabase REST API)

export default router;
