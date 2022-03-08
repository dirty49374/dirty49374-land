import Cors from 'micro-cors';
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './graphql-schema';
import { resolvers } from './resolvers';

export const config = {
  api: {
    bodyParser: false
  }
};

const cors = Cors();

const BASIC_LOGGING: any = {
  requestDidStart(requestContext: any) {
    const query = requestContext.request.query;
    if (query.includes("IntrospectionQuery")) return;

    console.log('QUERY: ', requestContext.request.query.split("\n")[0]);
    console.log('        args:', requestContext.request.variables);
    return {
      didEncounterErrors(requestContext: any) {
        console.log('an error happened in response to query ' + requestContext.request.query);
        console.log(requestContext.errors);
      }
    };
  },

  willSendResponse(requestContext: any) {
    // console.log("response sent", requestContext.response);
  }
};

const plugins = process.env.NODE_ENV !== 'production'
  ? [BASIC_LOGGING]
  : [];

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: any) => {

  },
  introspection: true,
  // playground: true,
  debug: true,
  plugins,
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

