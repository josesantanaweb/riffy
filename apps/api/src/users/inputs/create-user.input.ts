import { Role } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field(() => String)
  name: string;

  @IsString()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @Field(() => String)
  password: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  phone?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  state?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  role?: Role;
}
