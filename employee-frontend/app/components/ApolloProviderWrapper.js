// components/ApolloProviderWrapper.js
"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../../lib/apollo"; // Import the client you created

export default function ApolloProviderWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}