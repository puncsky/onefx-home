/* tslint:disable:non-literal-fs-path */
import axios from "axios";
import config from "config";
import fs from "fs";
import { startServer } from "./start-server";

const port = config.get("server.port");

async function generateStaticHtml(): Promise<void> {
  const server = await startServer();

  await Promise.all(
    ["", "doc.html", "contributing.html"].map(async route => {
      const res = await axios.get(`http://localhost:${port}/${route}`);
      const html = res.data;
      fs.writeFileSync(
        `${__dirname}/../../dist/${route || "index.html"}`,
        html
      );
    })
  );
  server.close();
}

generateStaticHtml().catch(err => {
  // tslint:disable-next-line:no-console
  console.error(`failed to generate static HTML: ${err}`);
});
