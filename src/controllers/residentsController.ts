// -----------------------------
// Controller for residents: Handles request, calls service, sends response
// Controller สำหรับ residents: รับ request, เรียก service, ส่ง response
// -----------------------------

import { Request, Response, NextFunction } from 'express';
import { ResidentsService } from '../services/residentsService';
import axios from 'axios';

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

// Get all residents (fetch from Supabase REST API)
// ดึงข้อมูลผู้อยู่อาศัยทั้งหมดจาก Supabase REST API (getAll2)
export const getAllResidents2 = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // ใส่ URL ของ Supabase REST API และ API Key (ถ้าต้องการ)
    const response = await axios.get('https://wnuvmmfllkpewjmzvkbt.supabase.co/rest/v1/residents', {
      headers: {
        'apikey': process.env.SUPABASE_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndudXZtbWZsbGtwZXdqbXp2a2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTY1NTYsImV4cCI6MjA2NTg5MjU1Nn0.wJOhDiZJ_cqKh4C3nLPUqAEP5WPZ_hfWchCHMlJAVxM',
        'Authorization': `Bearer ${process.env.SUPABASE_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndudXZtbWZsbGtwZXdqbXp2a2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTY1NTYsImV4cCI6MjA2NTg5MjU1Nn0.wJOhDiZJ_cqKh4C3nLPUqAEP5WPZ_hfWchCHMlJAVxM'}`,
      }
    });
    res.json({ message: 'Get all residents (Supabase REST)', data: response.data });
  } catch (err: any) {
    res.status(500).json({ error: 'Supabase REST error', details: err.message });
  }
};
