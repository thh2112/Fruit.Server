import { UserDto } from 'src/repositories/dtos/user/user.dto';

export interface RoleStrategy {
  defineAbilities(can: any, cannot: any, user: UserDto): void;
}
