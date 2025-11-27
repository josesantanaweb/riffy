import { IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { BoardStatus } from '@prisma/client';

@InputType()
export class CreateBoardInput {
  @IsString()
  @Field(() => String)
  bingoId: string;

  @IsOptional()
  @Field(() => BoardStatus, { nullable: true })
  status?: BoardStatus;
}
