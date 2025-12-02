import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { PaymentStatus } from '@prisma/client';
import { Board } from 'src/boards/entities/boards.entity';
import { Bingo } from 'src/bingos/entities/bingo.entity';

@ObjectType()
export class Payment {
  @Field(() => ID)
  id: string;

  @Field()
  buyerName: string;

  @Field()
  amount: number;

  @Field()
  nationalId: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  paymentDate?: Date;

  @Field()
  proofUrl: string;

  @Field()
  paymentMethod: string;

  @Field(() => PaymentStatus, { nullable: true })
  status?: PaymentStatus;

  @Field(() => [Board], { nullable: true })
  boards?: Board[];

  @Field(() => Bingo, { nullable: true })
  bingo?: Bingo;
}
