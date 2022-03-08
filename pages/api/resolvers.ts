import dbConnect, { dbCollection } from "@/lib/dbConnect";
import { Blog, Comment, Maybe, PageInfo, Resolvers } from "@/lib/generated/graphql";
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
type PaginationResult<T> = {
  edges: {
    cursor: string;
    node: T;
  }[];
  nodes: T[];
  pageInfo: PageInfo;
};

async function pagination<T>(
  collection: Collection<Document>,
  { first, last, after, before }: PaginationArgs,
  filter: any = {},
): Promise<PaginationResult<T>> {
  const order = first ? -1 : 1;
  const count = (first ? first : last) || 0;
  let filter_ = first
    ? (after ? { _id: { $lt: new ObjectId(after) } } : {})
    : (before ? { _id: { $gt: new ObjectId(before) } } : {});
  filter = { ...filter, ...filter_ };

  const cursor = collection
    .find<T>(filter)
    .sort({ _id: order })
    .limit(count);
  const nodes = await cursor.toArray();
  fixIds(nodes);

  const edges = nodes.map(node => ({
    cursor: (node as any).id,
    node
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
  return { pageInfo, edges, nodes };
}

export const resolvers: Resolvers = {
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
  Query: {
    blog: async (_, args) => {
      const blogs = await dbCollection('blogs', 'blogs');
      const blog = await blogs.findOne<Blog>({ title: args.title });
      return blog;
    },
    blogs: async (_, args) => {
      const blogs = await dbCollection('blogs', 'blogs');
      return await pagination(blogs, args);
    },
  },
  Blog: {
    comments: async (parent, args) => {
      const comments = await dbCollection('blogs', 'comments');
      return await pagination(comments, args, {
        blogId: new ObjectId(parent.id!)
      })
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

      const blogs = await dbCollection('blogs', 'blogs');
      const rst = await blogs.insertOne(blog);
      blog.id = rst.insertedId.toString();

      return blog;
    },
    likeBlog: async (parent, args) => {
      const blogs = await dbCollection('blogs', 'blogs');
      const result = await blogs.updateOne(
        { _id: new ObjectId(args.id) },
        { $inc: { likes: 1 } }
      );

      return result.modifiedCount;
    },
    dislikeBlog: async (parent, args) => {
      const blogs = await dbCollection('blogs', 'blogs');
      const result = await blogs.updateOne(
        { _id: new ObjectId(args.id) },
        { $inc: { dislikes: 1 } }
      );

      return result.modifiedCount;
    },
    postComment: async (parent, args) => {
      const comments = await dbCollection('blogs', 'comments');
      const comment: Comment = {
        blogId: new ObjectId(args.blogId) as any,
        publishedAt: new Date().toISOString(),
        comment: args.comment,
      };
      const result = await comments.insertOne(comment);
      comment.id = result.insertedId.toString();

      return comment;
    }
  }
};
