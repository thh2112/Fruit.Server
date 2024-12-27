import { CaslAction, CaslSubjectAll } from 'src/constants/enums';
import { RoleStrategy } from '../../interfaces';
import { UserDto } from 'src/modules/common/user/dtos';
export class DeniedRoleStrategy implements RoleStrategy {
  defineAbilities(can: any, cannot: any, user: UserDto): void {
    cannot(CaslAction.Manage, CaslSubjectAll);
  }
}
