import { ParsedUrlQuery } from "querystring";

export const parsePaginationVariables = (query: ParsedUrlQuery, pageSize: number) => {
  const after = typeof query.after === 'string' ? query.after : null;
  const before = typeof query.before === 'string' ? query.after : null;

  return typeof before === 'string'
    ? { last: pageSize, before }
    : { first: pageSize, after: after as string };
};