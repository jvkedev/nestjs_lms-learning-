import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CourseModule } from './course/course.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/role.guard';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URI');

        const isProd = config.get('NODE_ENV') === 'production';

        return {
          uri,
          autoIndex: !isProd,
          autoCreate: !isProd,
          bufferCommands: !isProd,
        };
      },
    }),

    UserModule,
    AuthModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
