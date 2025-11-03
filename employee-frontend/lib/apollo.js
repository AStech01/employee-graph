// lib/apollo-client.js
// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const client = new ApolloClient({
//   // **Change this URI to your actual GraphQL server endpoint**
//   uri: "http://localhost:4000/graphql", 
//   cache: new InMemoryCache(),
// });

// export default client;


// lib/apollo-client.js
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// // 💡 IMPORTANT: Import HttpLink from the client package
// import { HttpLink } from "@apollo/client"; 

// // 1. Define the URI for your GraphQL server
// const httpLink = new HttpLink({
//   // **Change this URI to your actual GraphQL server endpoint**
//   uri: "http://localhost:4000/graphql", 
// });

// const client = new ApolloClient({
//   // 2. Specify the link property using the HttpLink instance
//   link: httpLink, 
//   // 3. Keep the cache property
//   cache: new InMemoryCache(),
// });

// export default client;

// lib/apollo-client.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"; 

const httpLink = new HttpLink({
  // Must be correct
  uri: "http://localhost:4000/graphql", 
});

const client = new ApolloClient({
  // Must use 'link', not 'uri'
  link: httpLink, 
  cache: new InMemoryCache(),
});

export default client;