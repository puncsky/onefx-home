/* tslint:disable:no-any */
import config from "config";
// @ts-ignore
import { Config, Server } from "onefx/lib/server";
import { setModel } from "../model";
import { OnefxAuth } from "../shared/onefx-auth";
import { authConfig } from "../shared/onefx-auth/auth-config";
import { setGateways } from "./gateway/gateway";
import { setMiddleware } from "./middleware";
import { setServerRoutes } from "./server-routes";

type MyServer = Server & {
  auth: OnefxAuth;
};

export async function startServer(): Promise<Server> {
  const server = new Server((config as any) as Config) as MyServer;
  setGateways(server);
  server.auth = new OnefxAuth(server, authConfig);
  setMiddleware(server);
  setModel(server);
  setServerRoutes(server);

  const port = process.env.PORT || config.get("server.port");
  server.listen(Number(port));
  return server;
}
