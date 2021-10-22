// src/server.js
const {Server, Origins} = require('boardgame.io/server');
const {CodesterCombat} = require('./component/GamePage/Game');

const server = Server({
  games: [CodesterCombat],
  origins: [Origins.LOCALHOST],
});

server.run(8000);
