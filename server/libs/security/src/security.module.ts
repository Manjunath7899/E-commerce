import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secrete_access_key'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expires_in'),
        },
      }),
    }),
  ],
  providers: [HashingService],
  exports: [HashingService, JwtModule],
})
export class SecurityModule {}
