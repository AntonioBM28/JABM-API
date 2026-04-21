import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { FilterAuditDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';
import { Role } from '../common/enums';

@Controller('audit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  /**
   * GET /audit
   * Solo ADMIN puede consultar registros de auditoría.
   * Filtros disponibles por query params:
   *   ?userId=uuid&startDate=2024-01-01&endDate=2024-12-31&severity=WARNING&action=LOGIN_FAILED
   */
  @Get()
  @Roles(Role.ADMIN)
  findAll(@Query() filters: FilterAuditDto) {
    return this.auditService.findAll(filters);
  }
}
