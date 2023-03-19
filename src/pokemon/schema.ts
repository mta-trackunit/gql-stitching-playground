import { SubschemaConfig } from "@graphql-tools/delegate";
import { loadSchema } from "@graphql-tools/load";
import { readFileSync } from "fs";
import { GraphQLSchema } from "graphql";
import { join } from "path";
import { makeRemoteExecutor } from "../utils/remote-schema";

const gqlSchema = readFileSync(join(__dirname, "schema.graphqls"), "utf-8");

export const getPokemonSchemaConfig = async (): Promise<
  SubschemaConfig | GraphQLSchema
> => {
  const executor = makeRemoteExecutor("https://graphqlpokemon.favware.tech/v7");
  const schema = await loadSchema(gqlSchema, { loaders: [] });
  const schemaConfig: SubschemaConfig = {
    schema,
    executor,
  };
  return schemaConfig;
};
