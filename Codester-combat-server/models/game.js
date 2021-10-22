const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;
const timestamps = require('mongoose-timestamp');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { Rank, RankTC } = require('./rank');
const { Player, PlayerTC } = require('./player');
const { Problem, ProblemTC } = require('./problem');

const gameSchema = new Schema(
  {
    player1: { type: ObjectId, ref: 'Player' },
    player2: { type: ObjectId, ref: 'Player' },
    rank: { type: ObjectId, ref: 'Rank' },
    problems: [{ type: ObjectId, ref: 'Problem' }],
    winner: { type: ObjectId, ref: 'User' },
  },
  { collection: 'games' }
);

gameSchema.plugin(timestamps);

gameSchema.index({ createdAt: 1, updatedAt: 1 });

const Game = mongoose.model('Game', gameSchema);
const GameTC = composeWithMongoose(Game);

GameTC.addResolver({
  name: 'createOne',
  type: GameTC.getResolver('createOne').getType(),
  args: {
    player1: 'String',
    player2: 'String',
    rank: 'String',
    problems: '[String]',
  },
  resolve: async ({ source, args, context, info }) => {
    const game = Game.create({
      player1: await Player.findById(args.player1).exec(),
      player2: await Player.findById(args.player2).exec(),
      problems: await Problem.find({ _id: { $in: args.problems } }).exec(),
      rank: await Rank.findOne({ name: args.rank }).exec(),
    });
    return {
      record: game,
    };
  },
});

GameTC.addRelation('player1', {
  resolver: () => PlayerTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.player1 || [],
  },
  projection: { player1: true },
});

GameTC.addRelation('player2', {
  resolver: () => PlayerTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.player2 || [],
  },
  projection: { player2: true },
});

GameTC.addRelation('rank', {
  resolver: () => RankTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.rank || [],
  },
  projection: { rank: true },
});

GameTC.addRelation('problems', {
  resolver: () => ProblemTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: (source) => source.problems || [],
  },
  projection: { problems: true },
});

const GameQuery = {
  gameById: GameTC.getResolver('findById'),
  gameByIds: GameTC.getResolver('findByIds'),
  gameOne: GameTC.getResolver('findOne'),
  gameMany: GameTC.getResolver('findMany'),
  gameCount: GameTC.getResolver('count'),
  gameConnection: GameTC.getResolver('connection'),
  gamePagination: GameTC.getResolver('pagination'),
};

const GameMutation = {
  gameCreateOne: GameTC.getResolver('createOne'),
  gameCreateMany: GameTC.getResolver('createMany'),
  gameUpdateById: GameTC.getResolver('updateById'),
  gameUpdateOne: GameTC.getResolver('updateOne'),
  gameUpdateMany: GameTC.getResolver('updateMany'),
  gameRemoveById: GameTC.getResolver('removeById'),
  gameRemoveOne: GameTC.getResolver('removeOne'),
  gameRemoveMany: GameTC.getResolver('removeMany'),
};

module.exports = {
  Game,
  GameTC,
  GameQuery,
  GameMutation,
};
