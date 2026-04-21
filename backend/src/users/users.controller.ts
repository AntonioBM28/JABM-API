import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { UpdateUserDto, UpdateRoleDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles, GetUser } from '../auth/decorators';
import { Role } from '../common/enums';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Todas las rutas requieren autenticación
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users
   * Lista todos los usuarios. El password se excluye automáticamente
   * por @Exclude() en la entidad + ClassSerializerInterceptor global.
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * GET /users/:id
   * Obtiene el perfil de un usuario específico.
   */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * PATCH /users/:id
   * Edita el perfil de un usuario.
   * Protección IDOR: solo el propio usuario o un ADMIN puede editar.
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser('userId') requestingUserId: string,
    @GetUser('role') requestingUserRole: Role,
  ) {
    return this.usersService.update(
      id,
      updateUserDto,
      requestingUserId,
      requestingUserRole,
    );
  }

  /**
   * PATCH /users/:id/role
   * Cambia el rol de un usuario. Solo ADMIN.
   */
  @Patch(':id/role')
  @Roles(Role.ADMIN)
  updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @GetUser('userId') adminUserId: string,
    @Req() req: Request,
  ) {
    const ipAddress = req.ip || req.socket.remoteAddress || null;
    return this.usersService.updateRole(id, updateRoleDto, adminUserId, ipAddress);
  }

  /**
   * DELETE /users/:id
   * Elimina un usuario. Solo ADMIN.
   */
  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser('userId') adminUserId: string,
    @Req() req: Request,
  ) {
    const ipAddress = req.ip || req.socket.remoteAddress || null;
    return this.usersService.remove(id, adminUserId, ipAddress);
  }
}
