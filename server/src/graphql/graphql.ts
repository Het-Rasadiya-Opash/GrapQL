import { ApolloServer } from "@apollo/server";
import { graphQLSchema } from "./schema/schema.js";
import { graghQLResolver } from "./resolver/resolver.js";
import { startStandaloneServer } from "@apollo/server/standalone";

export const connectGraphQL = (port: number, envMode: string) => {
  const server = new ApolloServer({
    typeDefs: graphQLSchema,
    resolvers: graghQLResolver,
  });

  startStandaloneServer(server, {
    listen: {
      port,
    },
  })
    .then(() => {
      console.log(
        `Server is Working on Port:` + port + `in` + envMode + `Mode.`,
      );
    })
    .catch((err) => {
      console.log(err);
    });

  return server;
};
