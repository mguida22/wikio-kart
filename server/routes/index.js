'use strict';

let express = require('express');
let router = express.Router();

/* GET home page. */

router.get('/', (req, res) => {
  res.render('index', { title: 'WikiRace' });
});

module.exports = router;
