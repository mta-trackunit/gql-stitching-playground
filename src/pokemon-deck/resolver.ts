import { Arg, Query, Resolver } from "type-graphql";
import { Person, Pokemon } from "./model";

@Resolver()
export class PokemonDeckResolver {
  @Query((returns) => Person)
  async stitchPerson(@Arg("id") id: string): Promise<Person> {
    //  "Luke Skywalker"
    if (id === "cGVvcGxlOjE=") {
      return {
        id,
        pokemonDeck: [
          new Pokemon("venusaur"),
          new Pokemon("ivysaur"),
          new Pokemon("charmander"),
        ],
      };
    }
    return {
      id,
      pokemonDeck: [
        new Pokemon("charizard"),
        new Pokemon("squirtle"),
        new Pokemon("spearow"),
      ],
    };
  }
}
