const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;
const timestamps = require('mongoose-timestamp');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const champSchema = new Schema(
  {
    name: { type: String, required: true },
    rank: { type: ObjectId, ref: 'Rank' },
    testCase: {
      input: { type: String },
      output: { type: String },
    },
    skill1: { type: Number },
    skill2: { type: Number },
    heal: { type: Number },
    shield: { type: Number },
  },
  { collection: 'champs' }
);

champSchema.plugin(timestamps);

champSchema.index({ createdAt: 1, updatedAt: 1 });

const Champ = mongoose.model('Champ', champSchema);
const ChampTC = composeWithMongoose(Champ);

const ChampQuery = {
  champById: ChampTC.getResolver('findById'),
  // champByIds: ChampTC.getResolver('findByIds'),
  champOne: ChampTC.getResolver('findOne'),
  champMany: ChampTC.getResolver('findMany'),
  // champCount: ChampTC.getResolver('count'),
  // champConnection: ChampTC.getResolver('connection'),
  // champPagination: ChampTC.getResolver('pagination'),
};

const ChampMutation = {
  champCreateOne: ChampTC.getResolver('createOne'),
  // champCreateMany: ChampTC.getResolver('createMany'),
  // champUpdateById: ChampTC.getResolver('updateById'),
  // champUpdateOne: ChampTC.getResolver('updateOne'),
  // champUpdateMany: ChampTC.getResolver('updateMany'),
  // champRemoveById: ChampTC.getResolver('removeById'),
  champRemoveOne: ChampTC.getResolver('removeOne'),
  // champRemoveMany: ChampTC.getResolver('removeMany'),
};

module.exports = {
  Champ,
  ChampTC,
  ChampQuery,
  ChampMutation,
};
