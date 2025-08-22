import { Mutation, Resolver, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { RegisterInput } from './inputs/register.input';
import { AuthResponse } from './entities/auth.entity';
import { LoginInput } from './inputs/login.input';
import { UsersService } from '../users/users.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => AuthResponse, { name: 'register' })
  register(@Args('input') input: RegisterInput): Promise<AuthResponse> {
    return this.authService.register(input);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  login(@Args('input') input: LoginInput): Promise<AuthResponse> {
    return this.authService.login(input);
  }
}
