// -----------------------------
// Database connection config for PostgreSQL (Supabase)
// ตั้งค่าการเชื่อมต่อฐานข้อมูล PostgreSQL (Supabase)
// -----------------------------

import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,        // Host ของฐานข้อมูล
  user: process.env.DB_USER,        // Username
  password: process.env.DB_PASS,    // Password
  database: process.env.DB_NAME,    // ชื่อฐานข้อมูล
  port: Number(process.env.DB_PORT) || 5432, // พอร์ต
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false // ใช้ SSL หรือไม่
});
