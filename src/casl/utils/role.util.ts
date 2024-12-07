import { Role } from 'src/constants/enums';
import { RoleDto } from 'src/services/role/dto/role.dto';

export class RoleUtil {
  private static roleUtilIns: RoleUtil;

  public static getInstance(): RoleUtil {
    if (!this.roleUtilIns) {
      this.roleUtilIns = new RoleUtil();
    }
    return this.roleUtilIns;
  }

  public getRoleType(role: RoleDto) {
    switch (role.role) {
      case Role.ADMIN:
        return 'admin';
      case Role.USER:
        return 'user';
      case Role.DENIED:
        return 'denied';
      default:
        return 'denied';
    }
  }
}
