import Cors from 'micro-cors';
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

export const config = {
  api: {
    bodyParser: false
  }
};

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: any) => {

  },
  introspection: true,
  // playground: true,
  debug: true,
});

const serversStart = apolloServer.start();

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

