import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'lib/dtos';
import { Address, AddressDocument, User, UserDocument } from 'lib/schemas';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
  ) {}

  async register(registerDto: RegisterDto): Promise<string> {
    const { addresses, email, phoneNumber, ...userData } = registerDto;
    const existingUser = await this.userModel
      .findOne({
        $or: [{ email }, { phoneNumber }],
      })
      .exec();
    if (existingUser) {
      throw new ConflictException(
        existingUser.email === email
          ? 'User with this email already exists'
          : 'User with this phone number already exists',
      );
    }
    const newUser = new this.userModel({
      ...userData,
      email,
      phoneNumber,
    });
    try {
      await newUser.save();
      for (const address of addresses) {
        const createdAddress = new this.addressModel({
          ...address,
          user: newUser._id,
        });
        await createdAddress.save();
      }
      return 'User Created';
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occoured while registering user',
      );
    }
  }
}
