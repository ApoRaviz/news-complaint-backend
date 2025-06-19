// routes/complaints.js
const express = require('express');
const router = express.Router();

// GET /api/complaints
router.get('/', (req, res) => {
  res.json({
    message: 'Get all complaints',
    data: []
  });
});

// POST /api/complaints
router.post('/', (req, res) => {
  const { title, description, newsUrl } = req.body;

  // Validation
  if (!title || !description) {
    return res.status(400).json({
      error: 'Title and description are required'
    });
  }

  // TODO: Save to database
  res.status(201).json({
    message: 'Complaint created successfully',
    data: {
      id: Date.now(),
      title,
      description,
      newsUrl,
      createdAt: new Date().toISOString()
    }
  });
});

// ✅ สำคัญมาก — export router เพื่อให้ index.js ใช้ได้
module.exports = router;
