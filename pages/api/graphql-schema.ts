import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  scalar DateTime
  scalar Date

  # common

  interface Node {
    id: ID
  }

  type PageInfo {
    cursor: String
    hasNextPage: Boolean!
  }


  # blogs -----------------------------------------
  type Blog implements Node {
    id: ID
    title: String
    publishedAt: DateTime!
    likes: Int
    dislikes: Int
    content: String!
    comments(first: Int, last: Int, after: String, before: String): CommentConnection
  }

  type BlogEdge {
    cursor: String!
    node: Blog!
  }

  type BlogConnection {
    pageInfo: PageInfo!
    edges: [BlogEdge!]
    nodes: [Blog!]
  }

  # comments -----------------------------------------
  type Comment {
    id: ID
    blogId: ID!
    publishedAt: DateTime!
    comment: String!
  }
  type CommentEdge {
    cursor: String!
    node: Comment!
  }

  type CommentConnection {
    pageInfo: PageInfo!
    edges: [CommentEdge!]
    nodes: [Comment!]
  }

  # -------------------------------------------------

  type Query {
    blog(title: String!): Blog
    blogs(first: Int, last: Int, after: String, before: String): BlogConnection!
    # blogs: [Blog]
  }

  type Mutation {
    postBlog(title: String!, content: String!): Blog
    postComment(blogId: ID!, comment: String!): Comment
    likeBlog(id: String!): Int!
    dislikeBlog(id: String!): Int!
  }
`;
