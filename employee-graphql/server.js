// import { ApolloServer } from "apollo-server";
// import { typeDefs } from "./schema.js";
// import { resolvers } from "./resolvers.js";

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// server.listen({ port: 4000 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
// import { ApolloServer } from "apollo-server";
// import { typeDefs } from "./schema.js";
// import { resolvers } from "./resolvers.js";

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   // 💡 FIX: Add the 'cors' configuration object here
//   cors: {
//     // Specify the exact origin of your Next.js frontend
//     origin: "http://localhost:3000",
//     // This is good practice if you use authentication (e.g., tokens in headers)
//     credentials: true, 
//   },
// });

// server.listen({ port: 4000 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

// server.js
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Enable CORS for your frontend
  cors: {
    origin: "http://localhost:3000", // Next.js frontend URL
    credentials: true,               // allows cookies or auth headers
  },
});

// Start the server
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
