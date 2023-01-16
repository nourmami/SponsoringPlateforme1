import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length, Matches, ValidateIf } from 'class-validator';


export class CreatePostDto {

    @IsNotEmpty({ message: 'Title is required' })
    @Length(3, 10, { message: 'Title must be between 3 and 30 characters' })
    title: string;

    @IsNotEmpty({ message: 'caption is required' })
    @Length(3, 10, { message: 'caption must be between 3 and 30 characters' })
    caption: string;

    @IsUrl()
    @IsNotEmpty({ message: 'photo is required' })
    photo: string;

}
