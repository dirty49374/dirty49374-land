export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Blog = Node & {
  __typename?: 'Blog';
  content: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  publishedAt: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
};

export type BlogConnection = {
  __typename?: 'BlogConnection';
  edges: Array<BlogEdge>;
  pageInfo: PageInfo;
};

export type BlogEdge = {
  __typename?: 'BlogEdge';
  cursor: Scalars['String'];
  node: Blog;
};

export type Mutation = {
  __typename?: 'Mutation';
  postBlog?: Maybe<Blog>;
};


export type MutationPostBlogArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
};

export type Node = {
  id?: Maybe<Scalars['ID']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  cursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  getBlogs: BlogConnection;
};


export type QueryGetBlogsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

import { ObjectId } from 'mongodb';