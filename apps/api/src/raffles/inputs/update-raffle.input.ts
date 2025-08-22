import { InputType, PartialType } from '@nestjs/graphql';
import { CreateRaffleInput } from './create-raffle.input';

@InputType()
export class UpdateRaffleInput extends PartialType(CreateRaffleInput) {}
