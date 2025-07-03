// -----------------------------
// Main entry point of the backend API (Express + TypeScript)
// จุดเริ่มต้นของระบบ backend (Express + TypeScript)
// -----------------------------

// Import dependencies
// นำเข้าโมดูลที่จำเป็น
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import residentsRouter from './routes/residents';

// Load environment variables from .env file
// โหลดค่าตัวแปรแวดล้อมจากไฟล์ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: Enable CORS and parse JSON request bodies
// ตั้งค่า middleware สำหรับ CORS และแปลง request body เป็น JSON
app.use(cors());
app.use(express.json());

// Health check route (root)
// เส้นทางสำหรับตรวจสอบสถานะเซิร์ฟเวอร์ (health check)
app.get('/', (req, res) => {
  res.json({ message: 'News Complaint Backend API (TypeScript)', version: '1.0.0', status: 'Running' });
});

// Mount residents API routes (CRUD)
// เชื่อมต่อเส้นทาง residents API (CRUD)
app.use('/api/residents', residentsRouter);

// Start the server and listen on the specified port
// เริ่มต้นเซิร์ฟเวอร์และรอรับคำขอบนพอร์ตที่กำหนด
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
