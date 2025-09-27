import { InputType, PartialType } from '@nestjs/graphql';
import { CreateNotificationInput } from './create-notification.input';

@InputType()
export class UpdateNotificationInput extends PartialType(
  CreateNotificationInput,
) {}
