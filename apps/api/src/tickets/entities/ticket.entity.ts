import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Ticket {
  @Field(() => ID)
  id: string;

  @Field()
  number: string;

  @Field({ nullable: true })
  raffleId?: string;

  @Field({ nullable: true })
  status?: string;
}
