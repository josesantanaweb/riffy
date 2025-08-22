import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';

import { AuthResponse } from './entities/auth.entity';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private getAccessToken(user: User): string {
    return this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    const user = await this.usersService.create(input);
    const accessToken = this.getAccessToken(user);
    return { user, accessToken };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const { email, password } = input;
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValid = await verify(user.password, password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const accessToken = this.getAccessToken(user);

    return { user, accessToken };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    delete user.password;
    return user;
  }
}
