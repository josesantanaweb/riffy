import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class Raffle {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  banner: string;

  @Field()
  logo: string;

  @Field()
  primaryColor: string;

  @Field({ nullable: true })
  secondaryColor?: string;

  @Field()
  totalTickets: number;

  @Field()
  price: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  drawDate?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;
}
