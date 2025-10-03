import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Role, UserStatus } from '@prisma/client';
import { PaymentMethod } from '../../payment-methods/entities/payment-method.entity';
import { Raffle } from '../../raffles/entities/raffle.entity';
import { Plan } from '../../plans/entities/plan.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  domain: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  brandColor?: string;

  @Field({ nullable: true })
  whatsapp?: string;

  @Field({ nullable: true })
  instagram?: string;

  @Field({ nullable: true })
  tiktok?: string;

  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  @Field(() => [Raffle], { nullable: true })
  raffles?: Raffle[];

  @Field(() => [PaymentMethod], { nullable: true })
  paymentMethods?: PaymentMethod[];

  @Field(() => Plan, { nullable: true })
  plan?: Plan;
}
