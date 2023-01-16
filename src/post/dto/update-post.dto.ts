import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length, Matches, ValidateIf } from 'class-validator';


export class UpdatePostDto {
    
    
    @IsNotEmpty({ message: 'Title is required' })
    @IsOptional()
    @Length(3, 10, { message: 'Title must be between 3 and 30 characters' })
    title: string;

    @IsOptional()
    @IsNotEmpty({ message: 'caption is required' })
    @Length(3, 10, { message: 'caption must be between 3 and 30 characters' })
    caption: string;

    
}
