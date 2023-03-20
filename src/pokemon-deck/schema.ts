import { SubschemaConfig } from "@graphql-tools/delegate";
import { buildSchema } from "type-graphql";
import { PokemonDeckResolver } from "./resolver";

export const getPokemonDeckSchemaConfig =
  async (): Promise<SubschemaConfig> => {
    return {
      schema: await buildSchema({
        resolvers: [PokemonDeckResolver],
      }),
      merge: {
        Person: {
          fieldName: "stitchPerson",
          selectionSet: "{ id }",
          args: (originalObject: { id: string }) => ({ id: originalObject.id }),
        },
      },
    };
  };
export default getPokemonDeckSchemaConfig;
