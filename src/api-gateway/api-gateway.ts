import { GraphQLRequest } from "apollo-link";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import {
  ApolloServer,
  introspectSchema,
  makeRemoteExecutableSchema,
  mergeSchemas
} from "apollo-server-koa";
import config from "config";
import dottie from "dottie";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { MyServer } from "../server/start-server";
import { MetaResolver } from "./resolvers/meta-resolver";

export async function setApiGateway(server: MyServer): Promise<void> {
  const resolvers = [MetaResolver];
  server.resolvers = resolvers;

  const sdlPath = path.resolve(__dirname, "api-gateway.graphql");
  const localSchema = await buildSchema({
    resolvers,
    emitSchemaFile: {
      path: sdlPath
    },
    validate: false
  });

  const schemas = [localSchema];

  const remoteLink = setContext(
    // tslint:disable-next-line:no-any
    (_: GraphQLRequest, prevContext: any) => {
      const auth = dottie.get(
        prevContext,
        "graphqlContext.headers.authorization"
      );
      return {
        headers: {
          Authorization: auth
        }
      };
    }
  ).concat(
    new HttpLink({
      uri: "https://tianpan.co/api-gateway/",
      fetch,
      headers: {
        "x-iotex-client-id": config.get("project")
      }
    })
  );
  const remoteSchema = makeRemoteExecutableSchema({
    schema: await introspectSchema(remoteLink),
    link: remoteLink
  });
  schemas.push(remoteSchema);

  const schema = mergeSchemas({
    schemas
  });

  const apollo = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: async _ => {
      return {};
    }
  });
  const gPath = "/api-gateway/";
  apollo.applyMiddleware({ app: server.app, path: gPath });
}
