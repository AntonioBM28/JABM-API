import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators';
import { Role } from '../common/enums';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard) // Todas las rutas requieren autenticación
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * POST /tasks
   * Crea una nueva tarea. El userId se toma del JWT automáticamente.
   */
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser('userId') userId: string,
  ) {
    return this.tasksService.create(createTaskDto, userId);
  }

  /**
   * GET /tasks
   * Obtiene solo las tareas del usuario autenticado.
   */
  @Get()
  findAll(@GetUser('userId') userId: string) {
    return this.tasksService.findAllByUser(userId);
  }

  /**
   * GET /tasks/:id
   * Obtiene una tarea con verificación de propiedad.
   */
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser('userId') userId: string,
    @GetUser('role') userRole: Role,
  ) {
    return this.tasksService.findOne(id, userId, userRole);
  }

  /**
   * PATCH /tasks/:id
   * Actualiza una tarea con verificación de propiedad.
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser('userId') userId: string,
    @GetUser('role') userRole: Role,
  ) {
    return this.tasksService.update(id, updateTaskDto, userId, userRole);
  }

  /**
   * DELETE /tasks/:id
   * Elimina una tarea con verificación de propiedad y registro en auditoría.
   */
  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser('userId') userId: string,
    @GetUser('role') userRole: Role,
    @Req() req: Request,
  ) {
    const ipAddress = req.ip || req.socket.remoteAddress || null;
    return this.tasksService.remove(id, userId, userRole, ipAddress);
  }
}
