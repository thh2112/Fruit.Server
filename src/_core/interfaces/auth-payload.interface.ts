import { RoleDto } from 'src/shared/modules/role/dto/role.dto';

export type IAuthPayload = {
  id: number;
  email: string;
  name: string;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
  role: RoleDto;
};
