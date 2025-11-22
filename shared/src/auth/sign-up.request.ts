import { Role } from '../user';

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  role: Role;
}