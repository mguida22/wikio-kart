'use strict';

const express = require('express');
const router = express.Router();

/* GET users listing. */
// router.get('/hi', (req, res) => {
//   res.send('respond with a resource');
// });

router.post('/user', (req, res) => {
  let name = req.body.name;
  let character = req.body.characterId;

  // send back id

  res.status(200);
});

router.post('/game', (req, res) => {
  let start = req.body.start;
  let end = req.body.end;
  let id = req.body.userId;
  let history = req.body.history;

  // save game data here

  res.status(200);
});

router.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

module.exports = router;
