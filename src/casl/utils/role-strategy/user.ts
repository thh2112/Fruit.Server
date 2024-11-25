import { RoleStrategy } from 'src/casl/interfaces';
import { CaslAction } from 'src/constants/enums';
import { RoleDto } from 'src/modules/admin/role/dto/role.dto';
import { UserDto } from 'src/modules/user/dto/user.dto';
export class UserRoleStrategy implements RoleStrategy {
  defineAbilities(can: any, cannot: any): void {
    can(CaslAction.Read, UserDto);
    cannot(CaslAction.Create, UserDto);
    cannot(CaslAction.Update, UserDto);
    cannot(CaslAction.Delete, UserDto);
    cannot(CaslAction.Manage, RoleDto);
  }
}
