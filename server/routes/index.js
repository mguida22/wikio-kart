'use strict';

const path = require('path');
const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, '../public/views/wikirace.html'));
});

module.exports = router;
