import { CaslAction, CaslSubjectAll } from 'src/constants/enums';

import { RoleStrategy } from '../../interfaces';
import { UserDto } from 'src/modules/features/user/dtos';

export class AdminRoleStrategy implements RoleStrategy {
  defineAbilities(can: any, cannot: any, user: UserDto): void {
    can(CaslAction.Manage, CaslSubjectAll);
  }
}
