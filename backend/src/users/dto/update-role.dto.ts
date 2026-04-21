import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../common/enums';

/**
 * DTO para cambiar el rol de un usuario.
 * Solo accesible por ADMIN.
 */
export class UpdateRoleDto {
  @IsEnum(Role, { message: 'El rol debe ser USER o ADMIN' })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  role: Role;
}
