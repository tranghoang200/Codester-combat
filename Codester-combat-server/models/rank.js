const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;
const timestamps = require('mongoose-timestamp');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const rankSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { collection: 'ranks' }
);

rankSchema.plugin(timestamps);

rankSchema.index({ createdAt: 1, updatedAt: 1 });

const Rank = mongoose.model('Rank', rankSchema);
const RankTC = composeWithMongoose(Rank);

const RankQuery = {
  rankById: RankTC.getResolver('findById'),
  rankByIds: RankTC.getResolver('findByIds'),
  rankOne: RankTC.getResolver('findOne'),
  rankMany: RankTC.getResolver('findMany'),
  rankCount: RankTC.getResolver('count'),
  rankConnection: RankTC.getResolver('connection'),
  RankPagination: RankTC.getResolver('pagination'),
};

const RankMutation = {
  rankCreateOne: RankTC.getResolver('createOne'),
  rankCreateMany: RankTC.getResolver('createMany'),
  rankUpdateById: RankTC.getResolver('updateById'),
  rankUpdateOne: RankTC.getResolver('updateOne'),
  rankUpdateMany: RankTC.getResolver('updateMany'),
  rankRemoveById: RankTC.getResolver('removeById'),
  rankRemoveOne: RankTC.getResolver('removeOne'),
  rankRemoveMany: RankTC.getResolver('removeMany'),
};

module.exports = {
  Rank,
  RankTC,
  RankQuery,
  RankMutation,
};
