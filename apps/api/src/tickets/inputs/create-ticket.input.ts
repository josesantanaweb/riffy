import { IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
  @IsString()
  @Field(() => String)
  number: string;

  @IsString()
  @Field(() => String)
  raffleId: string;
}
