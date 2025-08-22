import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';

import { AuthResponse } from './entities/auth.entity';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registra un nuevo usuario y retorna el usuario junto con el access token.
   * @param input Datos de registro del usuario
   * @returns Respuesta de autenticación con usuario y token
   */
  async register(input: RegisterInput): Promise<AuthResponse> {
    const user = await this.usersService.create(input);
    const accessToken = this.getAccessToken(user);
    return { user, accessToken };
  }

  /**
   * Inicia sesión de un usuario existente.
   * @param input Credenciales de acceso (email y contraseña)
   * @throws UnauthorizedException si las credenciales son inválidas
   * @returns Respuesta de autenticación con usuario y token
   */
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

  /**
   * Valida y retorna un usuario por su ID (sin el campo password).
   * @param id ID del usuario a validar
   * @returns Usuario sin el campo password
   */
  public async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    delete user.password;
    return user;
  }

  /**
   * Genera un access token JWT para el usuario.
   * @param user Usuario para el cual generar el token
   * @returns Access token JWT
   */
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
}
