'use strict';

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/hi', (req, res) => {
  res.send('respond with a resource');
});

router.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

module.exports = router;
