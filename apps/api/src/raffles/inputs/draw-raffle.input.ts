import { IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DrawRaffleInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  ticketId?: string;
}
