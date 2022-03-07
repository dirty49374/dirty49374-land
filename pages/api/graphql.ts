import Cors from 'micro-cors';
import { gql, ApolloServer } from 'apollo-server-micro';
import { BlogModel } from './_lib/models/blog';
import dbConnect from '@/lib/dbConnect';
import { GraphQLDateTime } from 'graphql-scalars';
import { GraphQLDate } from 'graphql-scalars';

export const config = {
  api: {
    bodyParser: false
  }
};

const typeDefs = gql`
  scalar DateTime
  scalar Date

  type Blog {
    id: ID
    title: String
    publishedAt: DateTime
    content: String
  }

  type Query {
    blogs: [Blog]
  }

  type Mutation {
    postBlog(title: String, content: String): Blog
  }
`;

const resolvers = {
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
  Query: {
    blogs: async () => {
      await dbConnect();
      return await BlogModel.find({});
    },
  },
  Mutation: {
    postBlog: async (parent: any, args: any) => {
      await dbConnect();
      const blog = new BlogModel({
        title: args.title,
        publishedAt: Date.now(),
        content: args.content,
      });
      return await blog.save();
    }
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

