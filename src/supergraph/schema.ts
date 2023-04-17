import { stitchSchemas } from "@graphql-tools/stitch";
import { GraphQLSchema } from "graphql";
import { getFavoritePokemonSchemaConfig } from "../favoritePokemon/schema";
import { getIceCreamSchemaConfig } from "../icecream/schema";
import { getPokemonSchemaConfig } from "../pokemon/schema";

import { getStarWarsSchemaConfig } from "../starwars/schema";

export const getSupergraphSchema = async (): Promise<GraphQLSchema> => {
  const iceCreamSchemaConfig = await getIceCreamSchemaConfig();
  const pokemonSchemaConfig = await getPokemonSchemaConfig();
  const starwarsSchemaConfig = await getStarWarsSchemaConfig();
  const favoritePokemonSchemaConfig = await getFavoritePokemonSchemaConfig();

  const supergraphSchema = stitchSchemas({
    subschemas: [
      starwarsSchemaConfig,
      pokemonSchemaConfig,
      favoritePokemonSchemaConfig,
      iceCreamSchemaConfig,
    ],
  });
  return supergraphSchema;
};

export default getSupergraphSchema;
