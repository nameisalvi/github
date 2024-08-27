import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../rules/match.rule';

/**
 * DTO that specify properties of a user record.
 */
export class CreateUserRequestDto {
  @IsString()
  @IsDefined({ message: 'Name field is required' })
  @IsNotEmpty({ message: 'Name field will not be empty' })
  @MaxLength(254, { message: 'Name field maximum length is 254' })
  name: string;

  @IsDefined({ message: 'Email field is required' })
  @IsNotEmpty({ message: 'Email field will not be empty' })
  @IsEmail(undefined, {
    message: 'Invalid email address',
  })
  @MaxLength(254, { message: 'Email field maximum length is 254' })
  email: string;

  @IsDefined({ message: 'Password field is required' })
  @IsNotEmpty({ message: 'Password field will not be empty' })
  @MinLength(8, { message: 'Password minimum length is 8' })
  @MaxLength(50, { message: 'Password maximum length is 50' })
  password: string;

  @IsDefined({ message: 'Confirm Password field is required' })
  @IsNotEmpty({ message: 'Confirm Password field will not be empty' })
  @MinLength(8, { message: 'Confirm Password minimum length is 8' })
  @MaxLength(50, { message: 'Confirm Password maximum length is 50' })
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
