import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from '../users/user.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userServices: UserService) {}

  async createUser(registerUserDto: RegisterUserDto) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

    const user = this.userServices.createUser({
      ...registerUserDto,
      password: hash,
    });

    return user;
  }
}
