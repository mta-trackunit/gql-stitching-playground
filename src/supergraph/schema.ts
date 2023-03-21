import { stitchSchemas } from "@graphql-tools/stitch";
import { GraphQLSchema } from "graphql";
import { getIceCreamSchemaConfig } from "../icecream/schema";
import { getStarWarsSchemaConfig } from "../starwars/schema";

export const getSupergraphSchema = async (): Promise<GraphQLSchema> => {
  const iceCreamSchemaConfig = await getIceCreamSchemaConfig();

  const starwarsSchemaConfig = await getStarWarsSchemaConfig();

  const supergraphSchema = stitchSchemas({
    subschemas: [starwarsSchemaConfig, iceCreamSchemaConfig],
  });
  return supergraphSchema;
};

export default getSupergraphSchema;
