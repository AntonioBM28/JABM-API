import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { AuditSeverity } from '../../common/enums';

/**
 * DTO para filtrar registros de auditoría.
 * Todos los campos son opcionales — actúan como filtros por query params.
 */
export class FilterAuditDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsDateString({}, { message: 'startDate debe tener formato ISO 8601' })
  startDate?: string;

  @IsOptional()
  @IsDateString({}, { message: 'endDate debe tener formato ISO 8601' })
  endDate?: string;

  @IsOptional()
  @IsEnum(AuditSeverity, {
    message: 'severity debe ser INFO, WARNING, ERROR o CRITICAL',
  })
  severity?: AuditSeverity;

  @IsOptional()
  @IsString()
  action?: string;
}
