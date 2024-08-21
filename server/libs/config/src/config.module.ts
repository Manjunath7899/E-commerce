import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import securityConfig from './security.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [databaseConfig, securityConfig],
      isGlobal: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigModule {}
