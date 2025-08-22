import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Roles as Role } from '../auth/enums/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserInput } from './inputs/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Obtiene todos los usuarios registrados.
   * Requiere autenticación y rol de usuario.
   */
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Obtiene un usuario por su ID.
   * @param id ID del usuario a buscar
   */
  @Query(() => User, { name: 'user' })
  user(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  /**
   * Obtiene el perfil del usuario autenticado.
   * @param context Contexto de la petición con el usuario autenticado
   */
  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'profile' })
  profile(@Context() context: { req: { user: User } }): User {
    const user = context.req.user;
    return user;
  }

  /**
   * Actualiza los datos de un usuario.
   * @param id ID del usuario a actualizar
   * @param input Datos nuevos para el usuario
   */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { name: 'updateUser' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdateUserInput }) input: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, input);
  }
}
