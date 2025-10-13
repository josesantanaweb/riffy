import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class TopBuyer {
  @Field(() => String)
  buyerName: string;

  @Field(() => String, { nullable: true })
  nationalId: string;

  @Field(() => Int)
  totalTickets: number;

  @Field(() => Float)
  totalSpent: number;
}
