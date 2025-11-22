import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto, SignInRequest, SignUpRequest } from '@clinic-application/shared';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(signInRequest: SignInRequest) {
    const user = await this.userService.findByEmail(signInRequest.email);
    if (!user) {
      throw new UnauthorizedException('Invalid User');
    }

    const passwordMatch = bcrypt.compare(signInRequest.password, user.password);

    if (passwordMatch) {
      const { password, ...rest } = user;
      return rest;
    } else {
      throw new UnauthorizedException('Wrong Password');
    }
  }

  async signUp(signUpRequest: SignUpRequest) {
    const encryptedPassword: string = await bcrypt.hash(signUpRequest.password, 10);
    const createUserDto: CreateUserDto = {
      email: signUpRequest.email,
      password: encryptedPassword,
      name: signUpRequest.name,
      role: signUpRequest.role,
    };

    const user = await this.userService.create(createUserDto);

    const { password, ...rest } = user;

    return rest;
  }
}
