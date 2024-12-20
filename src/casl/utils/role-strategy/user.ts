import { RoleStrategy } from 'src/casl/interfaces';
import { CaslAction } from 'src/constants/enums';
import { NewDto } from 'src/repositories/dtos/new/new.dto';
import { RoleDto } from 'src/repositories/dtos/role/role.dto';
import { UserDto } from 'src/repositories/dtos/user/user.dto';

export class UserRoleStrategy implements RoleStrategy {
  defineAbilities(can: any, cannot: any, user: UserDto): void {
    can(CaslAction.Read, UserDto, { id: user.id });
    can(CaslAction.Update, UserDto, { id: user.id });
    cannot(CaslAction.Update, UserDto);
    cannot(CaslAction.Create, UserDto);
    cannot(CaslAction.Delete, UserDto);
    cannot(CaslAction.Manage, RoleDto);

    can(CaslAction.Read, NewDto);
    cannot(CaslAction.Create, NewDto);
    cannot(CaslAction.Update, NewDto);
    cannot(CaslAction.Delete, NewDto);
  }
}
