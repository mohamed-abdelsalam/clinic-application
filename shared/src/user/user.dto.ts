import { Role } from './role';

export interface UserDto {
  email: string;
  name: string;
  password: string;
  role: Role;
}
