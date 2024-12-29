import { RoleDto } from 'src/modules/features//role/dtos';

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
