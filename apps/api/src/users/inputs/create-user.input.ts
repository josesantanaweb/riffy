import { Role, UserStatus } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field(() => String)
  name: string;

  @IsString()
  @Field(() => String)
  domain: string;

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
  @IsOptional()
  @Field(() => String, { nullable: true })
  terms?: string;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isRoundedLogo?: boolean;

  @IsString()
  @Field(() => String)
  password: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  whatsapp?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  tiktok?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  instagram?: string;

  @IsEnum(Role)
  @IsOptional()
  @Field(() => Role, { nullable: true })
  role?: Role;

  @IsEnum(UserStatus)
  @IsOptional()
  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  planId?: string;
}
