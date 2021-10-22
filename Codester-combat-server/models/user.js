const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamps = require('mongoose-timestamp');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { Rank, RankTC } = require('./rank');

const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    rank: { type: ObjectId, ref: 'Rank' },
    points: { type: Number, default: 0 },
  },
  { collection: 'users' }
);

userSchema.plugin(timestamps);

userSchema.index({ createdAt: 1, updatedAt: 1 });

const User = mongoose.model('User', userSchema);
const UserTC = composeWithMongoose(User);

UserTC.addResolver({
  name: 'createOne',
  type: UserTC.getResolver('createOne').getType(),
  args: {
    name: 'String',
    rank: 'String',
  },
  resolve: async ({ source, args, context, info }) => {
    let user = await User.findOne({ name: args.name }).exec();
    if (!user)
      user = await User.create({
        name: args.name,
        rank: await Rank.findOne({ name: args.rank }).exec(),
      });

    return {
      record: user,
    };
  },
});

// UserTC.addResolver({
//   name: 'updateOne',
//   type: UserTC.getResolver('createOne').getType(),
//   args: {
//     name: 'String',
//     rank: 'String',
//   },
//   resolve: async ({ source, args, context, info }) => {
//     const res = User.findByIdAndUpdate({
//       name: args.name,
//       rank: await Rank.findOne({ name: args.rank }).exec(),
//     });
//     return res;
//   },
// });

UserTC.addRelation('rank', {
  resolver: () => RankTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.rank || [],
  },
  projection: { rank: true },
});

const UserQuery = {
  userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
};

const UserMutation = {
  userCreateOne: UserTC.getResolver('createOne'),
  userCreateMany: UserTC.getResolver('createMany'),
  userUpdateById: UserTC.getResolver('updateById'),
  userUpdateOne: UserTC.getResolver('updateOne'),
  userUpdateMany: UserTC.getResolver('updateMany'),
  userRemoveById: UserTC.getResolver('removeById'),
  userRemoveOne: UserTC.getResolver('removeOne'),
  userRemoveMany: UserTC.getResolver('removeMany'),
};

module.exports = {
  User,
  UserTC,
  UserQuery,
  UserMutation,
};
