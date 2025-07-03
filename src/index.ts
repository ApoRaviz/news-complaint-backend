import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import residentsRouter from './routes/residents';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'News Complaint Backend API (TypeScript)', version: '1.0.0', status: 'Running' });
});

app.use('/api/residents', residentsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
