import {
  ArrayMaxSize,
  ArrayMinSize,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { Type } from 'class-transformer';

export class RegisterDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username should be string' })
  @Matches(/[A-Za-z]+$/, { message: 'Username must contain only letters' })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password should be string' })
  @MinLength(8, { message: 'Password must be atleast 8 characters long' })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'Password must contain at least one special character',
  })
  password: string;

  @IsNotEmpty({ message: 'Phone Number is required' })
  @IsString({ message: 'Phone number must be string' })
  @MinLength(10, { message: 'Phone number sould have 10 digits' })
  @MaxLength(10, { message: 'Phone number sould have 10 digits' })
  @Matches(/[0-9]+$/, { message: 'Phone number must contain only digits' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Address is required' })
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  @ArrayMinSize(1, { message: 'At least one address is required' })
  @ArrayMaxSize(2, { message: 'Maximum address entry will be two' })
  addresses: AddressDto[];
}
