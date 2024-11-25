import { RoleStrategy } from 'src/casl/interfaces';
import { CaslAction, CaslSubjectAll } from 'src/constants/enums';

export class AdminRoleStrategy implements RoleStrategy {
  defineAbilities(can: any, cannot: any): void {
    can(CaslAction.Manage, CaslSubjectAll);
  }
}
