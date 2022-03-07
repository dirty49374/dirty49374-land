import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient<any>({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export default client;
