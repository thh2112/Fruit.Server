import { RoleStrategy } from 'src/casl/interfaces';
import { CaslAction, CaslSubjectAll } from 'src/constants/enums';
import { UserDto } from 'src/repositories/dtos/user/user.dto';

export class AdminRoleStrategy implements RoleStrategy {
  defineAbilities(can: any, cannot: any, user: UserDto): void {
    can(CaslAction.Manage, CaslSubjectAll);
  }
}
