import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from '../users/user.service';
import { Role } from './role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServices: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateAccessToken(userId: string, role: Role) {
    const payload = { sub: userId, role };

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

    return this.generateAccessToken(user._id.toString(), user.role);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userServices.loginUser(loginUserDto);

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateAccessToken(user._id.toString(), user.role);
  }

  async getUserById(id: string) {
    return this.userServices.getUserById(id);
  }
}
