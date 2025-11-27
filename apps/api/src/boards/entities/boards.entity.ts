import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BoardStatus } from '@prisma/client';
import { Payment } from '../../payments/entities/payment.entity';
import { Bingo } from '../../bingos/entities/bingo.entity';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Board {
  @Field(() => ID)
  id: string;

  @Field()
  number: number;

  @Field(() => GraphQLJSON)
  numbers: any;

  @Field(() => GraphQLJSON, { nullable: true })
  markedNumbers?: any;

  @Field()
  status: BoardStatus;

  @Field(() => Payment, { nullable: true })
  payment?: Payment;

  @Field(() => Bingo, { nullable: true })
  bingo?: Bingo;
}
