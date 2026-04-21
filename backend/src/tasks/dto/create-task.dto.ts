import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MaxLength,
} from 'class-validator';
import { TaskStatus } from '../../common/enums';

/**
 * DTO para creación de tarea.
 * El userId NO se incluye aquí — se toma automáticamente del JWT
 * para prevenir que un usuario cree tareas a nombre de otro (IDOR).
 */
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MaxLength(255, { message: 'El título debe tener máximo 255 caracteres' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'El estado debe ser PENDING, IN_PROGRESS o DONE',
  })
  status?: TaskStatus;
}
