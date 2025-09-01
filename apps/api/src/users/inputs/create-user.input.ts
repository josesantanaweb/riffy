import { Role, UserStatus } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
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
  @IsOptional()
  @Field(() => String, { nullable: true })
  logo?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  brandColor?: string;

  @IsString()
  @Field(() => String)
  password: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  phone?: string;

  @IsEnum(Role)
  @IsOptional()
  @Field(() => Role, { nullable: true })
  role?: Role;

  @IsEnum(UserStatus)
  @IsOptional()
  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus;
}
