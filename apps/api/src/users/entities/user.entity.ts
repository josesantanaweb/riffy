import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Role, UserStatus } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  brandColor?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;
}
