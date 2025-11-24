import { Args, Query, Resolver, Mutation, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { BingosService } from './bingos.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Bingo } from './entities/bingo.entity';
import { UpdateBingoInput } from './inputs/update-bingo.input';
import { CreateBingoInput } from './inputs/create-bingo.input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { pubSub } from '../common/pubsub';

@Resolver()
export class BingosResolver {
  constructor(private readonly bingosService: BingosService) {}
  private pubSub = pubSub;

  /**
   * Obtiene todos los bingos registrados.
   * @param user Usuario logueado con su domain y rol
   * @returns Un array de objetos Bingo
   */
  @UseGuards(GqlAuthGuard)
  @Query(() => [Bingo], { name: 'bingos' })
  getAll(
    @CurrentUser() user: { domain: string; role: Role },
  ): Promise<Bingo[]> {
    return this.bingosService.findAll(user);
  }

  /**
   * Obtiene un bingo por su ID.
   * No necesita autenticación
   * @param id ID del bingo a buscar
   * @returns Un objeto Bingo si existe, si no lanza NotFoundException
   */
  @Query(() => Bingo, { name: 'bingo' })
  getOne(@Args('id', { type: () => String }) id: string): Promise<Bingo> {
    return this.bingosService.findOne(id);
  }

  /**
   * Crea un nuevo bingo.
   * El propietario (ownerId) se asigna automáticamente al usuario logueado.
   * Roles requeridos: ADMIN u OWNER
   * @param input Datos del nuevo bingo (sin ownerId)
   * @param user Usuario logueado que será el propietario del bingo
   * @returns El objeto Bingo creado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bingo, { name: 'createBingo' })
  create(
    @Args('input', { type: () => CreateBingoInput }) input: CreateBingoInput,
    @CurrentUser() user: { id: string; role: Role },
  ): Promise<Bingo> {
    return this.bingosService.create(input, user);
  }

  /**
   * Actualiza los datos de un bingo.
   * Roles requeridos: ADMIN u OWNER (solo puede actualizar sus propios bingos)
   * @param id ID del bingo a actualizar
   * @param input Datos nuevos para el bingo
   * @returns El objeto Bingo actualizado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bingo, { name: 'updateBingo' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('input', { type: () => UpdateBingoInput }) input: UpdateBingoInput,
    @CurrentUser() user: { id: string; role: Role },
  ): Promise<Bingo> {
    return this.bingosService.update(id, input, user);
  }

  /**
   * Elimina un bingo por su ID.
   * Roles requeridos: ADMIN u OWNER (solo puede eliminar sus propios bingos)
   * @param id ID del bingo a eliminar
   * @returns El objeto Bingo eliminado
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bingo, { name: 'deleteBingo' })
  delete(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: { id: string; role: Role },
  ): Promise<Bingo> {
    return this.bingosService.delete(id, user);
  }

  /**
   * Extrae un número aleatorio para el bingo especificado.
   * Esta mutación permite extraer números manualmente. El número extraído
   * se guarda en la base de datos y se notifica a todos los clientes suscritos
   * mediante la suscripción numberDraw.
   *
   * Roles requeridos: ADMIN u OWNER
   *
   * @param bingoId ID del bingo del cual se extraerá el número
   * @returns El número extraído (1-75) o null si ya se extrajeron todos los números
   */
  @Roles(Role.ADMIN, Role.OWNER)
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Number, { nullable: true, name: 'numberDraw' })
  async numberDraw(
    @Args('bingoId', { type: () => String }) bingoId: string,
  ): Promise<number | null> {
    return this.bingosService.numberDraw(bingoId);
  }

  /**
   * Inicia el sorteo automático de números para un bingo.
   * Extrae números automáticamente cada 4 segundos. El sorteo se detiene
   * automáticamente cuando se han extraído todos los números o se puede
   * detener manualmente con stopAutoNumberDraw.
   *
   * No requiere autenticación (puede ser llamado públicamente).
   *
   * @param bingoId ID del bingo para el cual iniciar el sorteo automático
   * @returns true si se inició correctamente, false si ya existe un sorteo activo
   */
  @Mutation(() => Boolean, { name: 'startAutoNumberDraw' })
  startAutoNumberDraw(
    @Args('bingoId', { type: () => String }) bingoId: string,
  ): Promise<boolean> {
    return this.bingosService.startAutoNumberDraw(bingoId);
  }

  /**
   * Detiene el sorteo automático de números para un bingo.
   * Limpia el intervalo asociado y detiene la extracción automática de números.
   *
   * No requiere autenticación (puede ser llamado públicamente).
   *
   * @param bingoId ID del bingo para el cual detener el sorteo automático
   * @returns true si se detuvo correctamente, false si no había un sorteo activo
   */
  @Mutation(() => Boolean, { name: 'stopAutoNumberDraw' })
  stopAutoNumberDraw(
    @Args('bingoId', { type: () => String }) bingoId: string,
  ): boolean {
    return this.bingosService.stopAutoNumberDraw(bingoId);
  }

  /**
   * Suscripción para recibir números extraídos en tiempo real.
   * Los clientes suscritos recibirán una notificación cada vez que se extraiga
   * un número para el bingo especificado, ya sea manualmente o mediante el
   * sorteo automático.
   *
   * @param bingoId ID del bingo del cual se desea recibir los números extraídos
   * @returns Un AsyncIterableIterator que emite números (1-75) cuando se extraen
   */
  @Subscription(() => Number, {
    name: 'numberDraw',
  })
  numberDrawSub(
    @Args('bingoId', { type: () => String }) bingoId: string,
  ): AsyncIterableIterator<number> {
    return this.pubSub.asyncIterableIterator(`NUMBER_DRAW_${bingoId}`);
  }
}
