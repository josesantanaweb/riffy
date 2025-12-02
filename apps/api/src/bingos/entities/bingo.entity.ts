import { ObjectType, Field, ID, GraphQLISODateTime, Int } from '@nestjs/graphql';
import { Board } from '../../boards/entities/boards.entity';
import { User } from '../../users/entities/user.entity';
import { BingoStatus } from '@prisma/client';

@ObjectType()
export class Bingo {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  banner: string;

  @Field(() => Int)
  totalBoards: number;

  @Field()
  price: number;

  @Field()
  award: number;

  @Field(() => [Int])
  drawnNumbers: number[];

  @Field()
  status: BingoStatus;

  @Field({ nullable: true })
  showDate?: boolean;

  @Field({ nullable: true })
  showProgress?: boolean;

  @Field(() => Int, { nullable: true })
  minBoards?: number;

  @Field(() => Int, { nullable: true })
  available?: number;

  @Field(() => Int, { nullable: true })
  sold?: number;

  @Field({ nullable: true })
  progress?: number;

  @Field(() => GraphQLISODateTime)
  drawDate: Date;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => [Board], { nullable: true })
  boards?: Board[];

  @Field(() => User, { nullable: true })
  owner?: User;

  @Field()
  ownerId: string;
}
