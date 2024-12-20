import { RoleStrategy } from 'src/casl/interfaces';
import { CaslAction, CaslSubjectAll } from 'src/constants/enums';
import { UserDto } from 'src/repositories/dtos/user/user.dto';
export class DeniedRoleStrategy implements RoleStrategy {
  defineAbilities(can: any, cannot: any, user: UserDto): void {
    cannot(CaslAction.Manage, CaslSubjectAll);
  }
}
