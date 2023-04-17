import { SubschemaConfig } from "@graphql-tools/delegate";
import { buildSchema } from "type-graphql";
import { FavoritePokemonResolver } from "./resolver";

export const getFavoritePokemonSchemaConfig =
  async (): Promise<SubschemaConfig> => {
    return {
      schema: await buildSchema({
        resolvers: [FavoritePokemonResolver],
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
export default getFavoritePokemonSchemaConfig;
