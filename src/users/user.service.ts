import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth/dto/registerUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(registerUserDto: RegisterUserDto) {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (error: unknown) {
      const e = error as { code?: number };

      const DUPLICATE_KEY_ERROR = 11000;
      if (e.code === DUPLICATE_KEY_ERROR) {
        throw new ConflictException('Email already registered');
      }

      throw error;
    }
  }
}
