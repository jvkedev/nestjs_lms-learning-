import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  register(@Body() registerUserDto: RegisterUserDto) {
    const result = this.authService.createUser(registerUserDto);
    return result;
  }
}
