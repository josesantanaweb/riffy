import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePlanUsageInput } from './create-plan-usage.input';

@InputType()
export class UpdatePlanUsageInput extends PartialType(CreatePlanUsageInput) {}
