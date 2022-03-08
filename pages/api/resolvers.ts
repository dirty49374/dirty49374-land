import dbConnect from "@/lib/dbConnect";
import { Blog, Maybe, PageInfo, Resolvers } from "@/lib/generated/graphql";
import { GraphQLDateTime, GraphQLDate } from "graphql-scalars";
import { Document, Collection, ObjectId } from "mongodb";

function fixIds<T>(list: T[]): T[] {
  list.forEach((p: any) => p.id = p._id.toString());
  return list;
}

function fixId<T>(v: T): T {
  (v as any).id = (v as any)._id.toString();
  return v;
}

type PaginationArgs = {
  first?: Maybe<number>;
  last?: Maybe<number>;
  after?: Maybe<string>;
  before?: Maybe<string>;
}
type Paged<T> = {
  edges: {
    cursor: string;
    node: T;
  }[];
  pageInfo: PageInfo;
};

async function pagination<T>(
  collection: Collection<Document>,
  { first, last, after, before }: PaginationArgs
): Promise<Paged<T>> {

  const order = first ? -1 : 1;
  const count = (first ? first : last) || 0;
  const filter = first
    ? (after ? { _id: { $lt: new ObjectId(after) } } : {})
    : (before ? { _id: { $gt: new ObjectId(before) } } : {});

  const cursor = collection
    .find<T>(filter)
    .sort({ _id: order })
    .limit(count);
  const blogs = await cursor.toArray();
  fixIds(blogs);

  const edges = blogs.map(blog => ({
    cursor: (blog as any).id,
    node: blog
  }));
  if (order === 1) {
    edges.reverse();
  }
  const pageInfo = {
    cursor: order === -1
      ? edges[edges.length - 1]?.cursor
      : edges[0]?.cursor,
    hasNextPage: edges.length === count,
  };
  return { pageInfo, edges };
}

export const resolvers: Resolvers = {
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
  Query: {
    // blogs: async () => {
    //   const client = await dbConnect();

    //   const collection = client.db('blogs').collection('blogs');
    //   const cursor = await collection.find<Blog>({})
    //     .sort({ _id: -1 });
    //   const result = await cursor.toArray();
    //   fixIds(result);

    //   return result;
    // },
    getBlogs: async (_, args) => {
      const client = await dbConnect();
      const collection = client.db('blogs').collection('blogs');

      return await pagination(collection, args);
      // const order = first ? -1 : 1;
      // const count = (first ? first : last) || 0;
      // const filter = first
      //   ? (after ? { _id: { $lt: new ObjectId(after) } } : {})
      //   : (before ? { _id: { $gt: new ObjectId(before) } } : {});

      // const cursor = collection
      //   .find<Blog>(filter)
      //   .sort({ _id: order })
      //   .limit(count);
      // const blogs = await cursor.toArray();
      // fixIds(blogs);

      // const edges = blogs.map(blog => ({
      //   cursor: blog.id,
      //   node: blog
      // }));
      // if (order === 1) {
      //   edges.reverse();
      // }
      // const pageInfo = {
      //   cursor: order === -1
      //     ? edges[edges.length - 1]?.cursor
      //     : edges[0]?.cursor,
      //   hasNextPage: edges.length < count,
      // };
      // return { pageInfo, edges };
    }
  },
  Mutation: {
    postBlog: async (parent, args) => {
      console.log('posting')
      const blog: Blog = {
        title: args.title,
        publishedAt: new Date().toISOString(),
        content: args.content,
      };

      const client = await dbConnect();
      const collection = client.db('blogs').collection('blogs');
      const rst = await collection.insertOne(blog);
      console.log(rst);

      blog.id = rst.insertedId.toString();
      return blog;
    }
  }
};