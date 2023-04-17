import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Pokemon {
  constructor(newName: string) {
    this.name = newName;
  }

  @Field((type) => String, { nullable: true })
  name?: string;
}

@ObjectType()
export class Person {
  @Field((type) => ID)
  public id: string;

  @Field((type) => Pokemon, { nullable: true })
  public favoritePokemon?: Pokemon;
}
