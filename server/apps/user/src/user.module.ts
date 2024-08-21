import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'lib/database';
import { ConfigModule } from 'lib/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema, User, UserSchema } from 'lib/schemas';
import { SecurityModule } from 'lib/security';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    SecurityModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
