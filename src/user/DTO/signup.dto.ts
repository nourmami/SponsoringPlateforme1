import { IsEmail,Length, IsNotEmpty, IsString, Matches, Validate } from 'class-validator';
import { loginDto } from './login.dto';
import { CustomMatchPasswords } from '../../common/passwordMatch.validator';


export class signupDto extends loginDto {
    

    @IsString()
    @Length(4,20)
    @Validate(CustomMatchPasswords, ['password'])
    confirmPassword : string;

    


    


}