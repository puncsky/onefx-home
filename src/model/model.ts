import { MyServer } from "../server/start-server";

export function setModel(server: MyServer): void {
  server.model = server.model || {};
  server.model.human = server.model.contact;
  server.model.event = server.model.personalNote;
}
