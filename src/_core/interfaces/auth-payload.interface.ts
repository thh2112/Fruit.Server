import { RoleDto } from 'src/repositories/dtos/role/role.dto';

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
