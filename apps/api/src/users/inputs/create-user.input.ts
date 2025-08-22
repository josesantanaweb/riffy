import { Role } from '@prisma/client';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @IsOptional()
  @IsString()
  @Field()
  name?: string;

  @IsString()
  @Field()
  username: string;

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
  role?: Role;

  @IsOptional()
  @IsString()
  @Field()
  refreshToken?: string;

  @IsOptional()
  @IsNumber()
  @Field()
  balance?: number;
}
