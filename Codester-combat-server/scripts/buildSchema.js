const fs = require('fs');
const path = require('path');
const { grapql } = require('graphql');
const { introspectionQuery, printSchema } = require('graphql/utilities');

const Schema = require('../schema');

async function buildSchema() {
  await fs.ensureFile('../data/schema.graphql.json');
  await fs.ensureFile('../data/schema.graphql');

  fs.writeFileSync(
    path.join(__dirname, '../data/schema.graphql.json'),
    JSON.stringify(await graphql(Schema, introspectionQuery), null, 2)
  );

  fs.writeFileSync(
    path.join(__dirname, '../data/schema.graphql.txt'),
    printSchema(Schema)
  );
}

async function run() {
  await buildSchema();
  console.log('Schema build complete!');
}

run().catch((e) => {
  console.log(e);
  process.exit(0);
});
