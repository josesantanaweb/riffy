import { Resolver, Query, Args, Context, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as Role } from '../auth/enums/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserInput } from './inputs/update-user.input';
import { CreateUserInput } from './inputs/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Obtiene todos los usuarios registrados.
   * Roles requeridos: ADMIN
   * Retorna: Un array de objetos User
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Obtiene un usuario por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del usuario a buscar
   * @returns Un objeto User si existe, si no lanza NotFoundException
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  user(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  /**
   * Obtiene el perfil del usuario autenticado.
   * Roles requeridos: ADMIN
   * @param context Contexto de la petición con el usuario autenticado
   * @returns El objeto User correspondiente al usuario autenticado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'profile' })
  profile(@Context() context: { req: { user: User } }): User {
    const user = context.req.user;
    return user;
  }

  /**
   * Crea un nuevo usuario.
   * Roles requeridos: ADMIN
   * @param input Datos del nuevo usuario
   * @returns El objeto User creado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { name: 'createUser' })
  create(
    @Args('input', { type: () => CreateUserInput }) input: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(input);
  }

  /**
   * Actualiza los datos de un usuario.
   * Roles requeridos: ADMIN
   * @param id ID del usuario a actualizar
   * @param input Datos nuevos para el usuario
   * @returns El objeto User actualizado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { name: 'updateUser' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdateUserInput }) input: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(id, input);
  }

  /**
   * Elimina un usuario por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del usuario a eliminar
   * @returns El objeto User eliminado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { name: 'deleteUser' })
  delete(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
