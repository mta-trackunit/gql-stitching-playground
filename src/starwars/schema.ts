import { SubschemaConfig } from "@graphql-tools/delegate";
import { loadSchema } from "@graphql-tools/load";
import { readFileSync } from "fs";
import { GraphQLSchema } from "graphql";
import { join } from "path";
import { makeRemoteExecutor } from "../utils/remote-schema";

const gqlSchema = readFileSync(join(__dirname, "schema.graphqls"), "utf-8");

export const getStarWarsSchemaConfig = async (): Promise<
  SubschemaConfig | GraphQLSchema
> => {
  const executor = makeRemoteExecutor(
    "https://swapi-graphql.netlify.app/.netlify/functions/index"
  );
  const schema = await loadSchema(gqlSchema, { loaders: [] });
  const schemaConfig: SubschemaConfig = {
    schema,
    executor,
  };
  return schemaConfig;
};

export default getStarWarsSchemaConfig;
