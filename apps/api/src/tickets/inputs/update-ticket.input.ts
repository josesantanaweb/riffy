import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTicketInput } from './create-ticket.input';

@InputType()
export class UpdateTicketInput extends PartialType(CreateTicketInput) {}
