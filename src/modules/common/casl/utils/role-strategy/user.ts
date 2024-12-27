import { CaslAction } from 'src/constants/enums';
import { RoleStrategy } from '../../interfaces';
import { UserDto } from 'src/modules/common/user/dtos';
import { NewsDto } from 'src/modules/common/news/dtos';
import { RoleDto } from 'src/modules/common/role/dtos';

export class UserRoleStrategy implements RoleStrategy {
  defineAbilities(can: any, cannot: any, user: UserDto): void {
    can(CaslAction.Read, UserDto, { id: user.id });
    can(CaslAction.Update, UserDto, { id: user.id });
    cannot(CaslAction.Update, UserDto);
    cannot(CaslAction.Create, UserDto);
    cannot(CaslAction.Delete, UserDto);
    cannot(CaslAction.Manage, RoleDto);

    can(CaslAction.Read, NewsDto);
    cannot(CaslAction.Create, NewsDto);
    cannot(CaslAction.Update, NewsDto);
    cannot(CaslAction.Delete, NewsDto);
  }
}
