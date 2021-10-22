const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;
const timestamps = require('mongoose-timestamp');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { User, UserTC } = require('./user');
const { Champ, ChampTC } = require('./champ');
const { Problem } = require('./problem');

const playerSchema = new Schema(
  {
    user: { type: ObjectId, ref: 'User' },
    champ: { type: ObjectId, ref: 'Champ' },
    problems: [{ type: ObjectId, ref: 'Problem' }],
    health: { type: Number, default: 100 },
    updatedAt: { type: Number, default: 100 },
  },
  { collection: 'players' }
);

playerSchema.plugin(timestamps);

playerSchema.index({ createdAt: 1, updatedAt: 1 });

const Player = mongoose.model('Player', playerSchema);
const PlayerTC = composeWithMongoose(Player);

PlayerTC.addResolver({
  name: 'createOne',
  type: PlayerTC.getResolver('createOne').getType(),
  args: {
    user: 'String',
    champ: 'String',
    problems: '[String]',
  },
  resolve: async ({ source, args, context, info }) => {
    const player = Player.create({
      user: await User.findById(args.user).exec(),
      champ: await Champ.findById(args.champ).exec(),
      problem: await Problem.find({ _id: { $in: args.problems } }),
    });
    return {
      record: player,
    };
  },
});

PlayerTC.addRelation('user', {
  resolver: () => UserTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.user || [],
  },
  projection: { user: true },
});

PlayerTC.addRelation('champ', {
  resolver: () => ChampTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.champ || [],
  },
  projection: { champ: true },
});

const PlayerQuery = {
  playerById: PlayerTC.getResolver('findById'),
  playerByIds: PlayerTC.getResolver('findByIds'),
  playerOne: PlayerTC.getResolver('findOne'),
  playerMany: PlayerTC.getResolver('findMany'),
  playerCount: PlayerTC.getResolver('count'),
  playerConnection: PlayerTC.getResolver('connection'),
  PlayerPagination: PlayerTC.getResolver('pagination'),
};

const PlayerMutation = {
  playerCreateOne: PlayerTC.getResolver('createOne'),
  playerCreateMany: PlayerTC.getResolver('createMany'),
  playerUpdateById: PlayerTC.getResolver('updateById'),
  playerUpdateOne: PlayerTC.getResolver('updateOne'),
  playerUpdateMany: PlayerTC.getResolver('updateMany'),
  playerRemoveById: PlayerTC.getResolver('removeById'),
  playerRemoveOne: PlayerTC.getResolver('removeOne'),
  playerRemoveMany: PlayerTC.getResolver('removeMany'),
};

module.exports = {
  Player,
  PlayerTC,
  PlayerQuery,
  PlayerMutation,
};
