import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto, RegisterDto } from 'lib/dtos';
import { Address, AddressDocument, User, UserDocument } from 'lib/schemas';
import { Model } from 'mongoose';
import {} from 'crypto';
import { HashingService } from 'lib/security';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    private readonly hasingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<string> {
    const { addresses, email, password, phoneNumber, ...userData } =
      registerDto;
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
    const hashPassword = await this.hasingService.hashPassword(password);
    const newUser = new this.userModel({
      ...userData,
      email,
      password: hashPassword,
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

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordValidate = this.hasingService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValidate)
      throw new UnauthorizedException('Invalid credentials');
    const payload = { userId: user._id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken: accessToken };
  }
}
