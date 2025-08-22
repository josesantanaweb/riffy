import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const { id } = refreshTokenDto;

    const user = await this.userService.findOne(id);

    if (!user) {
      throw new UnauthorizedException('Refresh token inválido');
    }
    try {
      return await this.authService.refreshToken(user.id, user.refreshToken);
    } catch (error: any) {
      console.error('error', error);
      throw new UnauthorizedException('Refresh token inválido');
    }
  }
}
