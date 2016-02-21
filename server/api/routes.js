'use strict';

const md5 = require('md5');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

router.post('/user', (req, res) => {
  let name = req.body.name;
  if (!name) {
    res.status(400).json({ error: 'incomplete arguments' });
    return;
  }
  // let character = req.body.characterId;

  let timestamp = new Date();
  let id = md5(name + timestamp);

  fs.readFile(path.join(__dirname, '../data/users.json'), (err, data) => {
    if (err) throw err;

    data = JSON.parse(data);

    data[id] = {
      name: name,
      // characterId: character,
    };

    data = JSON.stringify(data);
    fs.writeFile(path.join(__dirname, '../data/users.json'), data, (err) => {
      if (err) throw err;

      res.status(200);
    });
  });
});

router.post('/game', (req, res) => {
  let start = req.body.startTime;
  let end = req.body.endTime;
  let id = req.body.userId;
  let history = req.body.history;

  if (!start || !end || !id || !history) {
    res.status(400).json({ error: 'incomplete arguments' });
    return;
  }

  let timestamp = new Date();
  let gameId = md5(id + timestamp);

  let elapsed = moment(end - start).format('mm:ss:SS');

  // save game data here
  fs.readFile(path.join(__dirname, '../data/games.json'), (err, data) => {
    if (err) throw err;

    data = JSON.parse(data);

    if(!data[id]) {
      data[id] = {};
    }

    data[id][gameId] = {
      start: start,
      end: end,
      time: elapsed,
      history: history
    };

    data = JSON.stringify(data);
    fs.writeFile(path.join(__dirname, '../data/games.json'), data, (err) => {
      if (err) throw err;

      res.status(200);
    });
  });
});

router.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

module.exports = router;
