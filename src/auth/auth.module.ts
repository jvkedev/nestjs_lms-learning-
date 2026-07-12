import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './role.guard';

@Module({
  imports: [
    UserModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.getOrThrow<StringValue>('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, RolesGuard],
  exports: [AuthService, JwtModule, AuthGuard, RolesGuard],
})
export class AuthModule {}
