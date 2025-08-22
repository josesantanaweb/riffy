import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  balance: number;

  @Field()
  raking: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  role?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;
}
