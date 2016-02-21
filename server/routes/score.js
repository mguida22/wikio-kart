'use strict';

const path = require('path');
const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/score.html'));
});

module.exports = router;
