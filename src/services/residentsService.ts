// -----------------------------
// Service for residents: Handles business logic and database operations
// Service สำหรับ residents: จัดการ logic และติดต่อฐานข้อมูล
// -----------------------------

import { pool } from '../models/db';
import { Resident } from '../models/resident';

// Interface สำหรับ ResidentsService (Best Practice)
export interface IResidentsService {
  getAll(): Promise<Resident[]>;
  create(data: Omit<Resident, 'id'>): Promise<Resident>;
  update(id: number, data: Omit<Resident, 'id'>): Promise<Resident | null>;
  delete(id: number): Promise<Resident | null>;
}

// Implement interface ใน ResidentsService
export class ResidentsService implements IResidentsService {
  // Get all residents
  // ดึงข้อมูลผู้อยู่อาศัยทั้งหมด
   async getAll(): Promise<Resident[]> {
    const result = await pool.query('SELECT * FROM residents');
    return result.rows;
  }

  // Create a new resident
  // สร้างผู้อยู่อาศัยใหม่
   async create(data: Omit<Resident, 'id'>): Promise<Resident> {
    const result = await pool.query(
      'INSERT INTO residents (name, house_number) VALUES ($1, $2) RETURNING *',
      [data.name, data.house_number]
    );
    return result.rows[0];
  }

  // Update resident info
  // อัปเดตข้อมูลผู้อยู่อาศัย
   async update(id: number, data: Omit<Resident, 'id'>): Promise<Resident | null> {
    const result = await pool.query(
      'UPDATE residents SET name = $1, house_number = $2 WHERE id = $3 RETURNING *',
      [data.name, data.house_number, id]
    );
    return result.rows[0] || null;
  }

  // Delete a resident
  // ลบผู้อยู่อาศัย
   async delete(id: number): Promise<Resident | null> {
    const result = await pool.query('DELETE FROM residents WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
  }
}
