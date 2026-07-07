import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServices: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateAccessToken(userId: string) {
    const payload = { sub: userId };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async createUser(registerUserDto: RegisterUserDto) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

    const user = await this.userServices.createUser({
      ...registerUserDto,
      password: hash,
    });

    return this.generateAccessToken(user._id.toString());
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userServices.loginUser(loginUserDto);

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAccessToken(user._id.toString());
  }
}
