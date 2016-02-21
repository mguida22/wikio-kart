'use strict';

const md5 = require('md5');
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

router.post('/user', (req, res) => {
  let name = req.body.name;
  let character = req.body.characterId;

  let timestamp = new Date();
  let id = md5(name + timestamp);

  fs.readFile(path.join(__dirname, '../data/users.json'), (err, data) => {
    if (err) throw err;

    if (data.length === 0) {
      data = [];
    } else {
      data = JSON.parse(data);
    }

    data.push({
      name: name,
      characterId: character,
      id: id
    });

    data = JSON.stringify(data);
    fs.writeFile(path.join(__dirname, '../data/users.json'), data, (err) => {
      if (err) throw err;

      res.status(200);
    });
  });
});

router.post('/game', (req, res) => {
  let start = req.body.start;
  let end = req.body.end;
  let id = req.body.userId;
  let history = req.body.history;

  console.log(req.body);

  // save game data here

  res.status(200);
});

router.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

module.exports = router;
