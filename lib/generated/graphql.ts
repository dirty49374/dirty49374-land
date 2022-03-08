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
  comments?: Maybe<CommentConnection>;
  content: Scalars['String'];
  dislikes?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  likes?: Maybe<Scalars['Int']>;
  publishedAt: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
};


export type BlogCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type BlogConnection = {
  __typename?: 'BlogConnection';
  edges?: Maybe<Array<BlogEdge>>;
  nodes?: Maybe<Array<Blog>>;
  pageInfo: PageInfo;
};

export type BlogEdge = {
  __typename?: 'BlogEdge';
  cursor: Scalars['String'];
  node: Blog;
};

export type Comment = {
  __typename?: 'Comment';
  blogId: Scalars['ID'];
  comment: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  publishedAt: Scalars['DateTime'];
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  edges?: Maybe<Array<CommentEdge>>;
  nodes?: Maybe<Array<Comment>>;
  pageInfo: PageInfo;
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor: Scalars['String'];
  node: Comment;
};

export type Mutation = {
  __typename?: 'Mutation';
  dislikeBlog: Scalars['Int'];
  likeBlog: Scalars['Int'];
  postBlog?: Maybe<Blog>;
  postComment?: Maybe<Comment>;
};


export type MutationDislikeBlogArgs = {
  id: Scalars['String'];
};


export type MutationLikeBlogArgs = {
  id: Scalars['String'];
};


export type MutationPostBlogArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationPostCommentArgs = {
  blogId: Scalars['ID'];
  comment: Scalars['String'];
};

export type Node = {
  id?: Maybe<Scalars['ID']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  cursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  blog?: Maybe<Blog>;
  blogs: BlogConnection;
};


export type QueryBlogArgs = {
  title: Scalars['String'];
};


export type QueryBlogsArgs = {
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
  Comment: ResolverTypeWrapper<Comment>;
  CommentConnection: ResolverTypeWrapper<CommentConnection>;
  CommentEdge: ResolverTypeWrapper<CommentEdge>;
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
  Comment: Comment;
  CommentConnection: CommentConnection;
  CommentEdge: CommentEdge;
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
  comments?: Resolver<Maybe<ResolversTypes['CommentConnection']>, ParentType, ContextType, Partial<BlogCommentsArgs>>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dislikes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlogConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlogConnection'] = ResolversParentTypes['BlogConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<ResolversTypes['BlogEdge']>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<ResolversTypes['Blog']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BlogEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlogEdge'] = ResolversParentTypes['BlogEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Blog'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  blogId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentConnection'] = ResolversParentTypes['CommentConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<ResolversTypes['CommentEdge']>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CommentEdge'] = ResolversParentTypes['CommentEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Comment'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  dislikeBlog?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDislikeBlogArgs, 'id'>>;
  likeBlog?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationLikeBlogArgs, 'id'>>;
  postBlog?: Resolver<Maybe<ResolversTypes['Blog']>, ParentType, ContextType, RequireFields<MutationPostBlogArgs, 'content' | 'title'>>;
  postComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationPostCommentArgs, 'blogId' | 'comment'>>;
}>;

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Blog', ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  blog?: Resolver<Maybe<ResolversTypes['Blog']>, ParentType, ContextType, RequireFields<QueryBlogArgs, 'title'>>;
  blogs?: Resolver<ResolversTypes['BlogConnection'], ParentType, ContextType, Partial<QueryBlogsArgs>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Blog?: BlogResolvers<ContextType>;
  BlogConnection?: BlogConnectionResolvers<ContextType>;
  BlogEdge?: BlogEdgeResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentConnection?: CommentConnectionResolvers<ContextType>;
  CommentEdge?: CommentEdgeResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;


export type BlogsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type BlogsQuery = { __typename?: 'Query', blogs: { __typename?: 'BlogConnection', edges?: Array<{ __typename?: 'BlogEdge', cursor: string, node: { __typename?: 'Blog', id?: string | null, title?: string | null, publishedAt: string, content: string, likes?: number | null, dislikes?: number | null, comments?: { __typename?: 'CommentConnection', nodes?: Array<{ __typename?: 'Comment', id?: string | null, comment: string, publishedAt: string }> | null, pageInfo: { __typename?: 'PageInfo', cursor?: string | null, hasNextPage: boolean } } | null } }> | null, pageInfo: { __typename?: 'PageInfo', cursor?: string | null, hasNextPage: boolean } } };

export type BlogQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type BlogQuery = { __typename?: 'Query', blog?: { __typename?: 'Blog', id?: string | null, title?: string | null, publishedAt: string, content: string, likes?: number | null, dislikes?: number | null, comments?: { __typename?: 'CommentConnection', nodes?: Array<{ __typename?: 'Comment', id?: string | null, comment: string, publishedAt: string }> | null, pageInfo: { __typename?: 'PageInfo', cursor?: string | null, hasNextPage: boolean } } | null } | null };

export type PostBlogMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
}>;


export type PostBlogMutation = { __typename?: 'Mutation', postBlog?: { __typename?: 'Blog', id?: string | null } | null };

export type PostCommentMutationVariables = Exact<{
  blogId: Scalars['ID'];
  comment: Scalars['String'];
}>;


export type PostCommentMutation = { __typename?: 'Mutation', postComment?: { __typename?: 'Comment', id?: string | null } | null };

export type LikeBlogMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type LikeBlogMutation = { __typename?: 'Mutation', likeBlog: number };

export type DislikeBlogMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DislikeBlogMutation = { __typename?: 'Mutation', dislikeBlog: number };


export const BlogsDocument = gql`
    query blogs($first: Int, $after: String, $last: Int, $before: String) {
  blogs(first: $first, after: $after, last: $last, before: $before) {
    edges {
      cursor
      node {
        id
        title
        publishedAt
        content
        likes
        dislikes
        comments(first: 2) {
          nodes {
            id
            comment
            publishedAt
          }
          pageInfo {
            cursor
            hasNextPage
          }
        }
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
 * __useBlogsQuery__
 *
 * To run a query within a React component, call `useBlogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *   },
 * });
 */
export function useBlogsQuery(baseOptions?: Apollo.QueryHookOptions<BlogsQuery, BlogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BlogsQuery, BlogsQueryVariables>(BlogsDocument, options);
      }
export function useBlogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogsQuery, BlogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BlogsQuery, BlogsQueryVariables>(BlogsDocument, options);
        }
export type BlogsQueryHookResult = ReturnType<typeof useBlogsQuery>;
export type BlogsLazyQueryHookResult = ReturnType<typeof useBlogsLazyQuery>;
export type BlogsQueryResult = Apollo.QueryResult<BlogsQuery, BlogsQueryVariables>;
export const BlogDocument = gql`
    query blog($title: String!) {
  blog(title: $title) {
    id
    title
    publishedAt
    content
    likes
    dislikes
    comments(first: 5) {
      nodes {
        id
        comment
        publishedAt
      }
      pageInfo {
        cursor
        hasNextPage
      }
    }
  }
}
    `;

/**
 * __useBlogQuery__
 *
 * To run a query within a React component, call `useBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useBlogQuery(baseOptions: Apollo.QueryHookOptions<BlogQuery, BlogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BlogQuery, BlogQueryVariables>(BlogDocument, options);
      }
export function useBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogQuery, BlogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BlogQuery, BlogQueryVariables>(BlogDocument, options);
        }
export type BlogQueryHookResult = ReturnType<typeof useBlogQuery>;
export type BlogLazyQueryHookResult = ReturnType<typeof useBlogLazyQuery>;
export type BlogQueryResult = Apollo.QueryResult<BlogQuery, BlogQueryVariables>;
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
export const PostCommentDocument = gql`
    mutation postComment($blogId: ID!, $comment: String!) {
  postComment(blogId: $blogId, comment: $comment) {
    id
  }
}
    `;
export type PostCommentMutationFn = Apollo.MutationFunction<PostCommentMutation, PostCommentMutationVariables>;

/**
 * __usePostCommentMutation__
 *
 * To run a mutation, you first call `usePostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postCommentMutation, { data, loading, error }] = usePostCommentMutation({
 *   variables: {
 *      blogId: // value for 'blogId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function usePostCommentMutation(baseOptions?: Apollo.MutationHookOptions<PostCommentMutation, PostCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostCommentMutation, PostCommentMutationVariables>(PostCommentDocument, options);
      }
export type PostCommentMutationHookResult = ReturnType<typeof usePostCommentMutation>;
export type PostCommentMutationResult = Apollo.MutationResult<PostCommentMutation>;
export type PostCommentMutationOptions = Apollo.BaseMutationOptions<PostCommentMutation, PostCommentMutationVariables>;
export const LikeBlogDocument = gql`
    mutation likeBlog($id: String!) {
  likeBlog(id: $id)
}
    `;
export type LikeBlogMutationFn = Apollo.MutationFunction<LikeBlogMutation, LikeBlogMutationVariables>;

/**
 * __useLikeBlogMutation__
 *
 * To run a mutation, you first call `useLikeBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeBlogMutation, { data, loading, error }] = useLikeBlogMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikeBlogMutation(baseOptions?: Apollo.MutationHookOptions<LikeBlogMutation, LikeBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeBlogMutation, LikeBlogMutationVariables>(LikeBlogDocument, options);
      }
export type LikeBlogMutationHookResult = ReturnType<typeof useLikeBlogMutation>;
export type LikeBlogMutationResult = Apollo.MutationResult<LikeBlogMutation>;
export type LikeBlogMutationOptions = Apollo.BaseMutationOptions<LikeBlogMutation, LikeBlogMutationVariables>;
export const DislikeBlogDocument = gql`
    mutation dislikeBlog($id: String!) {
  dislikeBlog(id: $id)
}
    `;
export type DislikeBlogMutationFn = Apollo.MutationFunction<DislikeBlogMutation, DislikeBlogMutationVariables>;

/**
 * __useDislikeBlogMutation__
 *
 * To run a mutation, you first call `useDislikeBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDislikeBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dislikeBlogMutation, { data, loading, error }] = useDislikeBlogMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDislikeBlogMutation(baseOptions?: Apollo.MutationHookOptions<DislikeBlogMutation, DislikeBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DislikeBlogMutation, DislikeBlogMutationVariables>(DislikeBlogDocument, options);
      }
export type DislikeBlogMutationHookResult = ReturnType<typeof useDislikeBlogMutation>;
export type DislikeBlogMutationResult = Apollo.MutationResult<DislikeBlogMutation>;
export type DislikeBlogMutationOptions = Apollo.BaseMutationOptions<DislikeBlogMutation, DislikeBlogMutationVariables>;