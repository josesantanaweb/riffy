import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BoardStatus } from '@prisma/client';
import { Payment } from '../../payments/entities/payment.entity';
import { Bingo } from '../../bingos/entities/bingo.entity';

@ObjectType()
export class Board {
  @Field(() => ID)
  id: string;

  @Field()
  number: string;

  @Field()
  status: BoardStatus;

  @Field(() => Payment, { nullable: true })
  payment?: Payment;

  @Field(() => Bingo, { nullable: true })
  bingo?: Bingo;
}
