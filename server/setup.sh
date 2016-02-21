#!/usr/bin/env bash

mkdir data/
cd data/
touch games.json
touch users.json

if [[ ! -s 'users.json' ]] ; then
  echo "{}" > 'users.json'
fi

if [[ ! -s 'games.json' ]] ; then
  echo "{}" > 'games.json'
fi
