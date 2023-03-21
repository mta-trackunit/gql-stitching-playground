// Typed-graphql needs this to be imported first
import "reflect-metadata";

import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import getStitchedRouterSchema from "./router/schema";

(async () => {
  const yoga = createYoga({
    schema: getStitchedRouterSchema(),
  });

  const server = createServer(yoga);

  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
})();
