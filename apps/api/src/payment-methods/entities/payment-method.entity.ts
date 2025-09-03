import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { PaymentMethodType } from '@prisma/client';
import '../../enums/payment-method-type.enum';

@ObjectType()
export class PaymentMethod {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String)
  type: PaymentMethodType;

  @Field({ nullable: true })
  bankName?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  nationalId?: string;

  @Field({ nullable: true })
  binanceId?: string;

  @Field({ nullable: true })
  binanceEmail?: string;

  @Field({ nullable: true })
  paypalEmail?: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => User, { nullable: true })
  owner?: User;
}
