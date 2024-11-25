import { RoleStrategy } from 'src/casl/interfaces';
import { CaslAction, CaslSubjectAll } from 'src/constants/enums';
export class DeniedRoleStrategy implements RoleStrategy {
  defineAbilities(can: any, cannot: any): void {
    cannot(CaslAction.Manage, CaslSubjectAll);
  }
}
