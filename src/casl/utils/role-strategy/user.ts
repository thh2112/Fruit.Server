import { RoleStrategy } from 'src/casl/interfaces';
import { CaslAction } from 'src/constants/enums';
import { NewsDto } from 'src/repositories/dtos/news/news.dto';
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

    can(CaslAction.Read, NewsDto);
    cannot(CaslAction.Create, NewsDto);
    cannot(CaslAction.Update, NewsDto);
    cannot(CaslAction.Delete, NewsDto);
  }
}
