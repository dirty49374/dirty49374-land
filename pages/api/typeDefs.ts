import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  scalar DateTime
  scalar Date

  interface Node {
    id: ID
  }

  type Blog implements Node {
    id: ID
    title: String
    publishedAt: DateTime!
    content: String!
  }

  type BlogEdge {
    cursor: String!
    node: Blog!
  }

  type BlogConnection {
    pageInfo: PageInfo!
    edges: [BlogEdge!]!
  }

  type PageInfo {
    cursor: String!
    hasNextPage: Boolean!
  }

  type Query {
    getBlogs(first: Int, last: Int, after: String, before: String): BlogConnection!
    # blogs: [Blog]
  }

  type Mutation {
    postBlog(title: String!, content: String!): Blog
  }
`;

