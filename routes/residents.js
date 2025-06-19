const express = require('express');
const router = express.Router();

// ฟังก์ชันช่วยสุ่มชื่อและบ้าน (ตัวอย่างง่าย ๆ)
function generateRandomName() {
  const names = ['สมชาย', 'สมหญิง', 'สมปอง', 'สมศรี', 'สมใจ'];
  const prefix = ['นาย', 'นาง', 'นางสาว'];
  return prefix[Math.floor(Math.random() * prefix.length)] + names[Math.floor(Math.random() * names.length)];
}

function generateRandomHouseNumber() {
  const num1 = Math.floor(Math.random() * 999) + 1;
  const num2 = Math.floor(Math.random() * 99) + 1;
  return `${num1}/${num2}`;
}

const SUPABASE_URL = 'https://wnuvmmfllkpewjmzvkbt.supabase.co/rest/v1/residents';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndudXZtbWZsbGtwZXdqbXp2a2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTY1NTYsImV4cCI6MjA2NTg5MjU1Nn0.wJOhDiZJ_cqKh4C3nLPUqAEP5WPZ_hfWchCHMlJAVxM';  // แทนด้วย key จริง

router.get('/', async (req, res) => {
  try {
    const response = await fetch(SUPABASE_URL, {
      headers: {
        'apikey': SUPABASE_API_KEY,
        'Authorization': `Bearer ${SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Supabase error:', text);
      return res.status(response.status).json({ error: 'Failed to fetch from Supabase', details: text });
    }

    const data = await response.json();

    res.json({
      message: 'Fetched residents from Supabase',
      data
    });
  } catch (error) {
    console.error('Error fetching from Supabase:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  // const { name, house_number } = req.body;
  const name = generateRandomName();
  const house_number = generateRandomHouseNumber();
  if (!name || !house_number) {
    return res.status(400).json({ error: 'name and house_number are required' });
  }

  try {
    const response = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_API_KEY,
        'Authorization': `Bearer ${SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'  // เพื่อให้ response ส่งข้อมูลที่เพิ่มกลับมา
      },
      body: JSON.stringify({ name, house_number })  // ส่งข้อมูลเป็น JSON
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Supabase insert error:', text);
      return res.status(response.status).json({ error: 'Failed to insert into Supabase', details: text });
    }

    const data = await response.json();

    res.status(201).json({
      message: 'Inserted resident into Supabase',
      data
    });

  } catch (error) {
    console.error('Error inserting into Supabase:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
