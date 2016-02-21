'use strict';

const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/', (req, res) => {
  let elapsed = req.query.elapsed;
  console.log(req.query);
  elapsed = moment.utc(Number(elapsed)).format("mm:ss.SS");

  fs.readFile(path.join(__dirname, '../data/highscores.json'), (err, data) => {
    if (err) { throw err; }
    data = JSON.parse(data);

    _.forEach(data, function(value, game) {
      _.map(data[game].scores, (score) => {
        score.time = moment.utc(score.time).format("mm:ss.SS");
        return score;
      });
    });

    res.render(path.join(__dirname, '../public/views/highscore.handlebars'), {
      layout: false,
      title: 'Highscores',
      highscores: data,
      time: elapsed
    });
  });
});

module.exports = router;
