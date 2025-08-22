import { Role } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;

  @IsString()
  @IsOptional()
  @Field()
  phone?: string;

  @IsString()
  @IsOptional()
  @Field()
  state?: string;

  @IsString()
  @IsOptional()
  @Field()
  role?: Role;
}
