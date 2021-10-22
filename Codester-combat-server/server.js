const { ApolloServer } = require('apollo-server-express');

const ErrorHandler = require('./helpers/errorHandler.js');

let apolloServer = null;

const schema = require('./schema');

async function startServer() {
  apolloServer = new ApolloServer({
    schema,

    formatError: ErrorHandler.formatGQLError,
    introspection: true,
    playground: true,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    // change this if you want to host schema on a different path
    path: '/',
    cors: true,
    onHealthCheck: () =>
      // eslint-disable-next-line no-undef
      new Promise((resolve, reject) => {
        if (mongoose.connection.readyState > 0) {
          resolve();
        } else {
          reject();
        }
      }),
  });
}
startServer();

const app = require('./index');

// Here you set the PORT and IP of the server
const port = 8001;
const ip = '127.0.0.1';

app.listen({ port, ip }, () =>
  console.log(`🚀 Server ready at http://${ip}:${port}`)
);

module.exports = app;
