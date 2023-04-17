import { Arg, Query, Resolver } from "type-graphql";
import { Person, Pokemon } from "./model";

@Resolver()
export class FavoritePokemonResolver {
  @Query((returns) => Person)
  async stitchPerson(@Arg("id") id: string): Promise<Person> {
    //  "Luke Skywalker"
    if (id === "cGVvcGxlOjE=") {
      return {
        id,
        favoritePokemon: new Pokemon("venusaur"),
      };
    }
    return {
      id,
      favoritePokemon: new Pokemon("squirtle"),
    };
  }
}
