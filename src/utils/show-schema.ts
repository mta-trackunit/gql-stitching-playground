import { printSchemaWithDirectives } from "@graphql-tools/utils";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { GraphQLSchema } from "graphql";
import { introspectionFromSchema } from "graphql/utilities";
import * as open from "open";
import { join } from "path";

import "reflect-metadata";

export const showSubgraphSchema = (schema: GraphQLSchema, savePath: string) => {
  const distDir = join(__dirname, "..", "..", "dist");
  if (!existsSync(distDir)) {
    mkdirSync(distDir);
  }

  writeFileSync(
    `${distDir}/${savePath}-schema.html`,
    `
  <!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/react@16/umd/react.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/react-dom@16/umd/react-dom.production.min.js"></script>

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/graphql-voyager/dist/voyager.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/graphql-voyager/dist/voyager.min.js"></script>
  </head>
  <body>
    <div id="voyager">Loading...</div>
    <script>
      function introspectionProvider(introspectionQuery) {
        // ... do a call to server using introspectionQuery provided
        // or just return pre-fetched introspection
        return Promise.resolve({ data: ${JSON.stringify(
          introspectionFromSchema(schema)
        )}});
      }

      // Render <Voyager />
      GraphQLVoyager.init(document.getElementById('voyager'), {
        introspection: introspectionProvider,
      });
    </script>
  </body>
</html>
`
  );

  writeFileSync(
    `${distDir}/${savePath}-schema.graphqls`,
    printSchemaWithDirectives(schema)
  );

  ((open as any).default ? (open as any).default : open)(
    `dist/${savePath}-schema.html`
  );
};

(async () => {
  const tsSchemaFolder = process.argv[2];
  if (!tsSchemaFolder) {
    console.error(
      "Please provide the folder for the subgraph to show like: \n npm run show starwars"
    );
    process.exit(1);
  }
  const tsSchemaPath = join(__dirname, "..", tsSchemaFolder, "schema.ts");
  console.log(`Reading schema from file: ${tsSchemaPath}`);

  const schemaLoaderObject = await import(tsSchemaPath);
  const schemaLoader =
    schemaLoaderObject.default ||
    schemaLoaderObject[Object.keys(schemaLoaderObject)[0]];
  const schemaOrSubgraphqlConfig = await schemaLoader();

  const schema = schemaOrSubgraphqlConfig.schema || schemaOrSubgraphqlConfig;

  showSubgraphSchema(schema, tsSchemaFolder);
})();
