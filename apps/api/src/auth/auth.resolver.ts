import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';

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

  @Query(() => AuthResponse, { name: 'refreshToken' })
  refreshToken(
    @Args('id') id: string,
    @Args('refreshToken') refreshToken: string,
  ): Promise<AuthResponse> {
    return this.authService.refreshToken(id, refreshToken);
  }

  @Mutation(() => Boolean, { name: 'logout' })
  async logout(@Args('id') id: string): Promise<boolean> {
    await this.usersService.update(id, { refreshToken: null });
    return true;
  }
}
