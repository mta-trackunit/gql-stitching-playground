import { Arg, Query, Resolver } from "type-graphql";
import { Person } from "./model";

@Resolver()
export class IceCreamResolver {
  @Query((returns) => Person)
  async stitchPerson(@Arg("id") id: string): Promise<Person> {
    //  "Luke Skywalker"
    if (id === "cGVvcGxlOjE=") {
      return {
        id,
        favoriteIceCream: "Magnum",
      };
    }
    return {
      id,
      favoriteIceCream: "Cornetto",
    };
  }
}
