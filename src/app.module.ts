import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
  controllers: [AppController],
})
export class AppModule {}
