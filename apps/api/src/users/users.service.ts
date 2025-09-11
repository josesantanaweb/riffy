import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { User } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los usuarios registrados en la base de datos, o filtra por rol si se especifica.
   * @param role (Opcional) Rol de usuario para filtrar (ej: 'ADMIN', 'OWNER')
   * @returns Arreglo de usuarios filtrados por rol o todos si no se especifica
   */
  async findAll(role?: Role): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: role ? { role } : {},
    });
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
   * Busca un usuario por su dominio.
   * @param domain Dominio del usuario a buscar
   * @throws NotFoundException si el usuario no existe
   * @returns El usuario encontrado con sus rifas
   */
  async findOneByDomain(domain: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        domain,
      },
      include: {
        raffles: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with domain ${domain} not found`);
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

  /**
   * Elimina los datos de un usuario existente.
   * @param id ID del usuario a eliminar
   * @returns El usuario eliminado
   */
  async delete(id: string): Promise<User> {
    const user = await this.findOne(id);
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return user;
  }
}
