import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Roles as Role } from '../auth/enums/roles.enum';
import { TicketsService } from './tickets.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Ticket } from './entities/ticket.entity';
import { UpdateTicketInput } from './inputs/update-ticket.input';
import { CreateTicketInput } from './inputs/create-ticket.input';

@Resolver()
export class TicketsResolver {
  constructor(private readonly TicketsService: TicketsService) {}

  /**
   * Obtiene todos los tickets registrados.
   * Roles requeridos: ADMIN
   * Retorna: Un array de objetos Ticket
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(() => [Ticket], { name: 'tickets' })
  getAll(): Promise<Ticket[]> {
    return this.TicketsService.findAll();
  }

  /**
   * Obtiene todos los tickets registrados por rifa.
   * Roles requeridos: ADMIN
   * Retorna: Un array de objetos Ticket
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => [Ticket], { name: 'ticketsByRaffleId' })
  getAllByRaffleId(
    @Args('raffleId', { type: () => String }) raffleId: string,
  ): Promise<Ticket[]> {
    return this.TicketsService.findAllByRaffleId(raffleId);
  }

  /**
   * Obtiene un ticket por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del ticket a buscar
   * @returns Un objeto Ticket si existe, si no lanza NotFoundException
   */
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(GqlAuthGuard)
  @Query(() => Ticket, { name: 'ticket' })
  getOne(@Args('id', { type: () => String }) id: string): Promise<Ticket> {
    return this.TicketsService.findOne(id);
  }

  /**
   * Crea un nuevo ticket.
   * Roles requeridos: ADMIN
   * @param input Datos del nuevo ticket
   * @returns El objeto Ticket creado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Ticket, { name: 'createTicket' })
  create(
    @Args('input', { type: () => CreateTicketInput }) input: CreateTicketInput,
  ): Promise<Ticket> {
    return this.TicketsService.create(input);
  }

  /**
   * Actualiza los datos de un ticket.
   * Roles requeridos: ADMIN
   * @param id ID del ticket a actualizar
   * @param input Datos nuevos para el ticket
   * @returns El objeto Ticket actualizado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Ticket, { name: 'updateTicket' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdateTicketInput }) input: UpdateTicketInput,
  ): Promise<Ticket> {
    return this.TicketsService.update(id, input);
  }

  /**
   * Elimina un ticket por su ID.
   * Roles requeridos: ADMIN
   * @param id ID del ticket a eliminar
   * @returns El objeto Ticket eliminado
   */
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Ticket, { name: 'deleteTicket' })
  delete(@Args('id', { type: () => String }) id: string): Promise<Ticket> {
    return this.TicketsService.delete(id);
  }
}
