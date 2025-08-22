import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los usuarios registrados en la base de datos.
   * @returns Arreglo de usuarios
   */
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  /**
   * Busca un usuario por su ID.
   * @param id ID del usuario a buscar
   * @throws NotFoundException si el usuario no existe
   * @returns El usuario encontrado
   */
  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  /**
   * Busca un usuario por su email.
   * @param email Email del usuario a buscar
   * @returns El usuario encontrado o null si no existe
   */
  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  /**
   * Crea un nuevo usuario.
   * @param data Datos del nuevo usuario
   * @returns El usuario creado
   */
  async create(data: CreateUserInput): Promise<User> {
    const { password, ...user } = data;
    const hashedPassword = await hash(password);
    return await this.prisma.user.create({
      data: {
        password: hashedPassword,
        ...user,
      },
    });
  }

  /**
   * Actualiza los datos de un usuario existente.
   * @param id ID del usuario a actualizar
   * @param data Datos nuevos para el usuario
   * @returns El usuario actualizado
   */
  async update(id: string, data: UpdateUserInput): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
