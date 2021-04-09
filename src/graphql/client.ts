import { ApolloClient, InMemoryCache } from "@apollo/client"

const cache = new InMemoryCache()

export const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  uri: "http://localhost:8888/api/admin/graphql",
  name: "react-web-client",
  version: "0.1",
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
})
