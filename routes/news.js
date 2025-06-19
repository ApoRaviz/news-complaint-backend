// routes/news.js
const express = require('express');
const router = express.Router();

// GET /api/news
router.get('/', (req, res) => {
  res.json({
    message: 'Get all news',
    data: []
  });
});

module.exports = router;