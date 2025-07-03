// -----------------------------
// Controller for residents: Handles request, calls service, sends response
// Controller สำหรับ residents: รับ request, เรียก service, ส่ง response
// -----------------------------

import { Request, Response, NextFunction } from 'express';
import { ResidentsService } from '../services/residentsService';

// Get all residents
// ดึงข้อมูลผู้อยู่อาศัยทั้งหมด
export const getAllResidents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const residents = await ResidentsService.getAll();
    res.json({ message: 'Get all residents', data: residents });
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};

// Create a new resident
// สร้างผู้อยู่อาศัยใหม่
export const createResident = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, house_number } = req.body;
  if (!name || !house_number) {
    res.status(400).json({ error: 'name and house_number are required' });
    return;
  }
  try {
    const resident = await ResidentsService.create({ name, house_number });
    res.status(201).json({ message: 'Resident created', data: resident });
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};

// Update resident info
// อัปเดตข้อมูลผู้อยู่อาศัย
export const updateResident = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { name, house_number } = req.body;
  if (!name || !house_number) {
    res.status(400).json({ error: 'name and house_number are required' });
    return;
  }
  try {
    const resident = await ResidentsService.update(Number(id), { name, house_number });
    if (!resident) {
      res.status(404).json({ error: 'Resident not found' });
      return;
    }
    res.json({ message: 'Resident updated', data: resident });
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};

// Delete a resident
// ลบผู้อยู่อาศัย
export const deleteResident = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    const resident = await ResidentsService.delete(Number(id));
    if (!resident) {
      res.status(404).json({ error: 'Resident not found' });
      return;
    }
    res.json({ message: 'Resident deleted', data: resident });
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};
