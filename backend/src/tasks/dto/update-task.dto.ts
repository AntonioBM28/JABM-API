import { IsString, IsOptional, IsEnum, MaxLength } from 'class-validator';
import { TaskStatus } from '../../common/enums';

/**
 * DTO para actualización parcial de tarea.
 * Todos los campos son opcionales (PATCH).
 */
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'El título debe tener máximo 255 caracteres' })
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'El estado debe ser PENDING, IN_PROGRESS o DONE',
  })
  status?: TaskStatus;
}
