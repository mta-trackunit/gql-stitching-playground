import { SubschemaConfig } from "@graphql-tools/delegate";
import { buildSchema } from "type-graphql";
import { IceCreamResolver } from "./resolver";

export const getIceCreamSchemaConfig = async (): Promise<SubschemaConfig> => {
  return {
    schema: await buildSchema({
      resolvers: [IceCreamResolver],
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
