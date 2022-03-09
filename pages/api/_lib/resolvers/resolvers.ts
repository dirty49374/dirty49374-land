import { blogsCollection, commentsCollection, dbCollection } from "@/lib/dbConnect";
import { Blog, Comment, Resolvers } from "@/lib/generated/graphql";
import { GraphQLDateTime, GraphQLDate } from "graphql-scalars";
import { ObjectId } from "mongodb";
import { mongoPaginator } from "./mongo-paginator";

export const resolvers: Resolvers = {
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
  Query: {
    blog: async (_, args) => {
      const blogs = await blogsCollection();
      const blog = await blogs.findOne<Blog>({ title: args.title });
      return blog;
    },
    blogs: async (_, args) => {
      const blogs = await blogsCollection();
      return await mongoPaginator(blogs, args);
    },
  },
  Blog: {
    comments: async (parent, args) => {
      const comments = await commentsCollection();
      return await mongoPaginator(comments, args, {
        blogId: new ObjectId(parent.id!)
      })
    }
  },
  Mutation: {
    postBlog: async (parent, args) => {
      const blog: Blog = {
        title: args.title,
        publishedAt: new Date().toISOString(),
        content: args.content,
      };

      const blogs = await blogsCollection();
      const rst = await blogs.insertOne(blog);
      blog.id = rst.insertedId.toString();

      return blog;
    },
    likeBlog: async (parent, args) => {
      const blogs = await blogsCollection();
      const result = await blogs.updateOne(
        { _id: new ObjectId(args.id) },
        { $inc: { likes: 1 } }
      );

      return result.modifiedCount;
    },
    dislikeBlog: async (parent, args) => {
      const blogs = await blogsCollection();
      const result = await blogs.updateOne(
        { _id: new ObjectId(args.id) },
        { $inc: { dislikes: 1 } }
      );

      return result.modifiedCount;
    },
    postComment: async (parent, args) => {
      const comments = await commentsCollection();
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
