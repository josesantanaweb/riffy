import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { NotificationStatus } from '@prisma/client';
import '../../enums/payment-method-type.enum';

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string;

  @Field()
  description: string;

  @Field(() => String)
  status: NotificationStatus;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => User, { nullable: true })
  owner?: User;

  @Field(() => String, { nullable: true })
  ownerId?: string;
}
