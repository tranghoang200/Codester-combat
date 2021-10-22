// Bring Mongoose into the app
const mongoose = require('mongoose');

// Build the connection string
const dbURI =
  'mongodb://codester-combat-pro:BASSlqx1VEGI8RssG6jlWsSCLVvN2Rk2tSHh6qnuUmRR9VtsmuFbzuGD4kjkIXM8VfOQPvxmP4wnjFcxoO7Jkg%3D%3D@codester-combat-pro.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@codester-combat-pro@';

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connection to CosmosDB successful'))
  .catch((err) => console.error(err));

mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log(
    '%s MongoDB connection error. Please make sure MongoDB is running.'
  );
  process.exit();
});
