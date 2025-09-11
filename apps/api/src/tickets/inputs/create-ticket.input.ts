import { IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { TicketStatus } from '@prisma/client';

@InputType()
export class CreateTicketInput {
  @IsString()
  @Field(() => String)
  number: string;

  @IsString()
  @Field(() => String)
  raffleId: string;

  @IsOptional()
  @Field(() => TicketStatus, { nullable: true })
  status?: TicketStatus;
}
