import { ApolloServer } from "@apollo/server";
import { graghQLResolver } from "./resolver/resolver.js";
import { graphQLSchema } from "./schema/schema.js";

export const connectGraphQL = () => {
  const server = new ApolloServer({
    typeDefs: graphQLSchema,
    resolvers: graghQLResolver,
  });

 
  return server;
};
