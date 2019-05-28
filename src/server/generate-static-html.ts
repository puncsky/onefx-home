/* tslint:disable:non-literal-fs-path */
import axios from "axios";
import config from "config";
import fs from "fs";
import { startServer } from "./start-server";

const port = config.get("server.port");

async function generateStaticHtml(): Promise<void> {
  const server = await startServer();
  let res = await axios.get(`http://localhost:${port}/`);
  let html = res.data;
  fs.writeFileSync(`${__dirname}/../../dist/index.html`, html);

  res = await axios.get(`http://localhost:${port}/doc.html`);
  html = res.data;
  fs.writeFileSync(`${__dirname}/../../dist/doc.html`, html);
  server.close();
}

generateStaticHtml().catch(err => {
  // tslint:disable-next-line:no-console
  console.error(`failed to generate static HTML: ${err}`);
});
