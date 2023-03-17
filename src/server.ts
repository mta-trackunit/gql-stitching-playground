// Typed-graphql needs this to be imported first
import "reflect-metadata";

import { stitchSchemas } from "@graphql-tools/stitch";
import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { getIceCreamSchemaConfig } from "./icecream/schema";
import { getStarWarsSchemaConfig } from "./starwars/schema";

(async () => {
  const iceCreamSchemaConfig = await getIceCreamSchemaConfig();

  const starwarsSchemaConfig = await getStarWarsSchemaConfig();

  const gatewaySchema = stitchSchemas({
    subschemas: [starwarsSchemaConfig, iceCreamSchemaConfig],
  });

  const yoga = createYoga({
    schema: gatewaySchema,
  });

  const server = createServer(yoga);

  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
})();
