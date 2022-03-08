import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Blog: ResolverTypeWrapper<Blog>;
  BlogConnection: ResolverTypeWrapper<BlogConnection>;
  BlogEdge: ResolverTypeWrapper<BlogEdge>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Blog'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Blog: Blog;
  BlogConnection: BlogConnection;
  BlogEdge: BlogEdge;
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Node: ResolversParentTypes['Blog'];
  PageInfo: PageInfo;
  Query: {};
  String: Scalars['String'];
}>;

export type BlogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Blog'] = ResolversParentTypes['Blog']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlogConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlogConnection'] = ResolversParentTypes['BlogConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['BlogEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlogEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlogEdge'] = ResolversParentTypes['BlogEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Blog'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  postBlog?: Resolver<Maybe<ResolversTypes['Blog']>, ParentType, ContextType, RequireFields<MutationPostBlogArgs, 'content' | 'title'>>;
}>;

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Blog', ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getBlogs?: Resolver<ResolversTypes['BlogConnection'], ParentType, ContextType, Partial<QueryGetBlogsArgs>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Blog?: BlogResolvers<ContextType>;
  BlogConnection?: BlogConnectionResolvers<ContextType>;
  BlogEdge?: BlogEdgeResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;


export type GetBlogsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type GetBlogsQuery = { __typename?: 'Query', getBlogs: { __typename?: 'BlogConnection', edges: Array<{ __typename?: 'BlogEdge', cursor: string, node: { __typename?: 'Blog', id?: string | null, title?: string | null, publishedAt: string, content: string } }>, pageInfo: { __typename?: 'PageInfo', cursor: string, hasNextPage: boolean } } };

export type PostBlogMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
}>;


export type PostBlogMutation = { __typename?: 'Mutation', postBlog?: { __typename?: 'Blog', id?: string | null } | null };


export const GetBlogsDocument = gql`
    query getBlogs($first: Int, $after: String, $last: Int, $before: String) {
  getBlogs(first: $first, after: $after, last: $last, before: $before) {
    edges {
      cursor
      node {
        id
        title
        publishedAt
        content
      }
    }
    pageInfo {
      cursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useGetBlogsQuery__
 *
 * To run a query within a React component, call `useGetBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useGetBlogsQuery(baseOptions?: Apollo.QueryHookOptions<GetBlogsQuery, GetBlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, options);
      }
export function useGetBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlogsQuery, GetBlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlogsQuery, GetBlogsQueryVariables>(GetBlogsDocument, options);
        }
export type GetBlogsQueryHookResult = ReturnType<typeof useGetBlogsQuery>;
export type GetBlogsLazyQueryHookResult = ReturnType<typeof useGetBlogsLazyQuery>;
export type GetBlogsQueryResult = Apollo.QueryResult<GetBlogsQuery, GetBlogsQueryVariables>;
export const PostBlogDocument = gql`
    mutation postBlog($title: String!, $content: String!) {
  postBlog(title: $title, content: $content) {
    id
  }
}
    `;
export type PostBlogMutationFn = Apollo.MutationFunction<PostBlogMutation, PostBlogMutationVariables>;

/**
 * __usePostBlogMutation__
 *
 * To run a mutation, you first call `usePostBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postBlogMutation, { data, loading, error }] = usePostBlogMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function usePostBlogMutation(baseOptions?: Apollo.MutationHookOptions<PostBlogMutation, PostBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostBlogMutation, PostBlogMutationVariables>(PostBlogDocument, options);
      }
export type PostBlogMutationHookResult = ReturnType<typeof usePostBlogMutation>;
export type PostBlogMutationResult = Apollo.MutationResult<PostBlogMutation>;
export type PostBlogMutationOptions = Apollo.BaseMutationOptions<PostBlogMutation, PostBlogMutationVariables>;