const { SchemaComposer } = require('graphql-compose');
const db = require('./models/db');

const schemaComposer = new SchemaComposer();

const { UserQuery, UserMutation } = require('./models/user');
const { RankQuery, RankMutation } = require('./models/rank');
const { ChampQuery, ChampMutation } = require('./models/champ');
const { GameQuery, GameMutation } = require('./models/game');
const { PlayerQuery, PlayerMutation } = require('./models/player');
const { ProblemQuery, ProblemMutation } = require('./models/problem');
const { PoolQuery, PoolMutation } = require('./models/pool');

schemaComposer.Query.addFields({
  ...UserQuery,
  ...RankQuery,
  ...ChampQuery,
  ...GameQuery,
  ...PlayerQuery,
  ...ProblemQuery,
  ...PoolQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...RankMutation,
  ...ChampMutation,
  ...GameMutation,
  ...PlayerMutation,
  ...ProblemMutation,
  ...PoolMutation,
});

module.exports = schemaComposer.buildSchema();
