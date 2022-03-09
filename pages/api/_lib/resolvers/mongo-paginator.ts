import { Maybe, PageInfo } from "@/lib/generated/graphql";
import { Collection, ObjectId, Document } from "mongodb";
import { mongoFixIds } from "./mongo-fixid";

export type PaginationArgs = {
  first?: Maybe<number>;
  last?: Maybe<number>;
  after?: Maybe<string>;
  before?: Maybe<string>;
}
export type PaginationResult<T> = {
  edges: {
    cursor: string;
    node: T;
  }[];
  nodes: T[];
  pageInfo: PageInfo;
};

export async function mongoPaginator<T>(
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
  mongoFixIds(nodes);

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