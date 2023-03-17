import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Person {
  @Field((type) => ID)
  public id: string;

  @Field({ nullable: true })
  public favoriteIceCream?: string;
}
