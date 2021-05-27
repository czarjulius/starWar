import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import express from 'express';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { Server } from 'http';
import { applyMiddleware } from 'graphql-middleware';
import SwapiData from './graphql/resources';
import config from './config';
import graphqlSchema from './graphql';

interface Resources {
  swapi: any,
}

const { typeDefs, resolvers } = graphqlSchema;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apolloServer = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
  ),
  dataSources: (): DataSources<Resources> => ({
    swapi: new SwapiData(config.apiUrl),
  }),
  formatError: (error: GraphQLError): GraphQLFormattedError => {
    if (error?.extensions?.code !== 'BAD_USER_INPUT') {
      console.error(JSON.stringify(error, null, 2));
    }
    return error;
  },
});

(async () => {
  await apolloServer.start();
})();
apolloServer.applyMiddleware({ app });

const shutdown = async (serverApp: Server) => {
  console.info('Received kill signal, shutting down gracefully');
  await serverApp.close();
  return process.exit();
};

const server = app.listen({ port: config.port }, () => console.info(`Server up and running at http://localhost:${config.port }`));

process.on('SIGINT', async () => {
  await shutdown(server);
});

process.on('SIGTERM', async () => {
  await shutdown(server);
});

export default app;