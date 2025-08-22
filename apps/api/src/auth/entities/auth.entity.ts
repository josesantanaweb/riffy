import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => User)
  user: User;
}
