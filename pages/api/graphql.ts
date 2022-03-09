import Cors from 'micro-cors';
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './graphql-schema';
import { resolvers } from './_lib/resolvers/resolvers';
import { apolloPlugins } from './plugin';

// import { loader } from 'graphql.macro';
// const typeDefs = loader('./schema.graphql');
// console.log(typeDefs);

export const config = {
  api: {
    bodyParser: false
  }
};


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: any) => {
  },
  introspection: true,
  debug: true,
  plugins: apolloPlugins,
});

const serversStart = apolloServer.start();

const cors = Cors();

export default cors(async (req: any, res: any) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await serversStart;
  const handler = await apolloServer.createHandler({
    path: '/api/graphql'
  });
  await handler(req, res);
});
