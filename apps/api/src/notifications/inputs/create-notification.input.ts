import { IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { NotificationStatus } from '@prisma/client';

@InputType()
export class CreateNotificationInput {
  @IsString()
  @Field(() => String)
  description: string;

  @IsOptional()
  @Field(() => NotificationStatus, { nullable: true })
  status?: NotificationStatus;
}
