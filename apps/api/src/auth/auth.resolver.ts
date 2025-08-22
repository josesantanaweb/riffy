import { Mutation, Resolver, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { RegisterInput } from './inputs/register.input';
import { AuthResponse } from './entities/auth.entity';
import { LoginInput } from './inputs/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registra un nuevo usuario en el sistema.
   * @param input Datos de registro del usuario
   * @returns Respuesta de autenticación con el usuario y el token
   */
  @Mutation(() => AuthResponse, { name: 'register' })
  register(@Args('input') input: RegisterInput): Promise<AuthResponse> {
    return this.authService.register(input);
  }

  /**
   * Inicia sesión de un usuario existente.
   * @param input Credenciales de acceso (email y contraseña)
   * @returns Respuesta de autenticación con el usuario y el token
   */
  @Mutation(() => AuthResponse, { name: 'login' })
  login(@Args('input') input: LoginInput): Promise<AuthResponse> {
    return this.authService.login(input);
  }
}
