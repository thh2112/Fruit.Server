import { CaslAction, CaslSubjectAll } from 'src/constants/enums';
import { UserDto } from 'src/repositories/dtos/user/user.dto';
import { RoleStrategy } from '../../interfaces';
export class DeniedRoleStrategy implements RoleStrategy {
  defineAbilities(can: any, cannot: any, user: UserDto): void {
    cannot(CaslAction.Manage, CaslSubjectAll);
  }
}