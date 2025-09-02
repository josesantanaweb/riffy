import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePurchaseInput } from './create-purchase.input';

@InputType()
export class UpdatePurchaseInput extends PartialType(CreatePurchaseInput) {}
