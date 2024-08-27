import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

/**
 * DTO that specify properties of a user login.
 */
export class UserLoginRequestDto {
  @IsDefined({ message: 'Email field is required' })
  @IsNotEmpty({ message: 'Email field will not be empty' })
  @IsEmail(undefined, {
    message: 'Invalid email address',
  })
  email: string;

  @IsDefined({ message: 'Password field is required' })
  @IsNotEmpty({ message: 'Password field will not be empty' })
  password: string;
}
