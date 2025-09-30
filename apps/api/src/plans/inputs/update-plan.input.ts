import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePlanInput } from './create-plan.input';

@InputType()
export class UpdatePlanInput extends PartialType(CreatePlanInput) {}
