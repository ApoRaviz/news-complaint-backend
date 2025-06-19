const express = require('express');
const router = express.Router();

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

module.exports = router;
