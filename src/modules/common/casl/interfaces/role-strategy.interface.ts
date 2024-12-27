import { UserDto } from 'src/modules/common/user/dtos';

export interface RoleStrategy {
  defineAbilities(can: any, cannot: any, user: UserDto): void;
}
