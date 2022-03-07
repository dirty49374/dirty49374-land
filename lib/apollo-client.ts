import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_URI = process.env.NEXT_PUBLIC_GRAPHQL_URI;
if (!GRAPHQL_URI) {
  throw new Error(
    'Please define the NEXT_PUBLIC_GRAPHQL_URI environment variable inside .env.local'
  )
}

const client = new ApolloClient<any>({
  uri: `${GRAPHQL_URI}/api/graphql`,
  cache: new InMemoryCache(),
});

export default client;
