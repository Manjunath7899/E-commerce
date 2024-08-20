import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  Matches,
} from 'class-validator';

export class AddressDto {
  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country must be a string' })
  @Length(1, 100, {
    message: 'Country must be between 1 and 100 characters long',
  })
  country: string;

  @IsNotEmpty({ message: 'State is required' })
  @IsString({ message: 'State must be a string' })
  @Length(1, 100, {
    message: 'State must be between 1 and 100 characters long',
  })
  state: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a string' })
  @Length(1, 100, { message: 'City must be between 1 and 100 characters long' })
  city: string;

  @IsNotEmpty({ message: 'Area is required' })
  @IsString({ message: 'Area must be a string' })
  @Length(1, 100, { message: 'Area must be between 1 and 100 characters long' })
  area: string;

  @IsNotEmpty({ message: 'Street is required' })
  @IsString({ message: 'Street must be a string' })
  @Length(1, 255, {
    message: 'Street must be between 1 and 255 characters long',
  })
  street: string;

  @IsOptional()
  @IsString({ message: 'Landmark must be a string' })
  @Length(0, 255, {
    message: 'Landmark must be between 0 and 255 characters long',
  })
  landmark?: string;

  @IsNotEmpty({ message: 'Postal Code is required' })
  @IsString({ message: 'Postal Code must be a string' })
  @Length(5, 10, {
    message: 'Postal Code must be between 5 and 10 characters long',
  })
  @IsNotEmpty({ message: 'Pincode is required' })
  @IsString({ message: 'Pincode must be a string' })
  @Length(5, 10, {
    message: 'Pincode must be between 5 and 10 characters long',
  })
  @Matches(/^[0-9]+$/, { message: 'Pincode must contain only digits' })
  pincode: string;
}
