#!/usr/bin/env bash

mkdir data/
cd data/
touch users.json
touch highscores.json

if [[ ! -s 'users.json' ]] ; then
  echo "{}" > 'users.json'
fi

if [[ ! -s 'highscores.json' ]] ; then
  echo "{}" > 'highscores.json'
fi
