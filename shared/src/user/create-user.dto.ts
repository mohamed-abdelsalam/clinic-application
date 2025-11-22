import { Role } from './role';

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  role: Role;
}
