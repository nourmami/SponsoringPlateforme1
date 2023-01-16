import {
  IsEmail,
  Length,
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { CustomMatchPasswords } from '../../common/passwordMatch.validator';

export class signupDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({ message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'UserName is required' })
  @Length(3, 10, { message: 'UserName must be between 7 and 20 characters' })
  userName: string;

  @IsString()
  @Length(7, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  //password will contain at least one uppercase letter, one lowercase letter, one number or special character, and be at least 4 characters long
  password: string;

  @IsString()
  @Length(4, 20)
  @Validate(CustomMatchPasswords, ['password'])
  confirmPassword: string;
}
