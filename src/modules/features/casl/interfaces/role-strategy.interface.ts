import { UserDto } from 'src/modules/features/user/dtos';

export interface RoleStrategy {
  defineAbilities(can: any, cannot: any, user: UserDto): void;
}
