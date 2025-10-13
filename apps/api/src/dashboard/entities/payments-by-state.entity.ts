import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaymentsByState {
  @Field(() => String)
  state: string;

  @Field(() => Int)
  percentage: number;
}
