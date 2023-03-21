import { stitchSchemas } from "@graphql-tools/stitch";
import { GraphQLSchema } from "graphql";
import { getIceCreamSchemaConfig } from "../icecream/schema";
import { getPokemonDeckSchemaConfig } from "../pokemon-deck/schema";
import { getPokemonSchemaConfig } from "../pokemon/schema";

import { getStarWarsSchemaConfig } from "../starwars/schema";

export const getSupergraphSchema = async (): Promise<GraphQLSchema> => {
  const iceCreamSchemaConfig = await getIceCreamSchemaConfig();
  const pokemonSchemaConfig = await getPokemonSchemaConfig();
  const starwarsSchemaConfig = await getStarWarsSchemaConfig();
  const pokemonDeckSchemaConfig = await getPokemonDeckSchemaConfig();

  const supergraphSchema = stitchSchemas({
    subschemas: [
      starwarsSchemaConfig,
      pokemonSchemaConfig,
      pokemonDeckSchemaConfig,
      iceCreamSchemaConfig,
    ],
  });
  return supergraphSchema;
};

export default getSupergraphSchema;
