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
    if (err) { throw err; }

    data = JSON.parse(data);

    data[id] = {
      name: name,
      // characterId: character,
    };

    data = JSON.stringify(data);
    fs.writeFile(path.join(__dirname, '../data/users.json'), data, (err) => {
      if (err) { throw err; }

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

  fs.readFile(path.join(__dirname, '../data/highscores.json'), (err, highscores) => {
    if (err) { throw err; }
    fs.readFile(path.join(__dirname, '../data/users.json'), (err, users) => {
      if (err) { throw err; }

      highscores = JSON.parse(highscores);
      users = JSON.parse(users);

      let highscoreId = md5(history[0] + history[history.length - 1]);
      let elapsed = end - start;

      let name = users[id].name;

      let data = {
        time: elapsed,
        id: id,
        name: name,
      };

      if (highscores[highscoreId]) {
        // place in array sorted by time (low to high)
        let prevIndex = 0;
        let scores = highscores[highscoreId].scores;
        for (let i = 0; i < scores.length; i++) {
          if (scores[i].time > elapsed) {
            scores.splice(prevIndex, 0, data);
            break;
          } else if (scores[i].name === name) {
            break;
          }
          prevIndex = i;
        }
      } else {
        highscores[highscoreId] = {
          startPage: history[0],
          endPage: history[history.length - 1],
          scores: [data]
        };
      }

      highscores = JSON.stringify(highscores);
      fs.writeFile(path.join(__dirname, '../data/highscores.json'), highscores, (err) => {
        if (err) { throw err; }

        res.status(200);
      });
    });
  });
});

router.use((req, res) => {
  res.status(404).send('Sorry cant find that!');
});

module.exports = router;
