import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { loginDto } from './DTO/login.dto';
import { signupDto, updateDto } from './DTO/signup.dto';
import { userService } from './user.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthenticatedUser, RoleInterceptor } from 'src/common/decorators';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { createClient } from '@supabase/supabase-js';
import * as uuid from 'uuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: userService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@AuthenticatedUser() user: User) {
    return user;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers(@AuthenticatedUser() user: User) {
    return this.userService.getUsers(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string, @AuthenticatedUser() user: User) {
    return await this.userService.getUserById(id, user.id);
  }

  @Post('login')
  async login(@Body() data: loginDto) {
    return await this.userService.login(data);
  }

  @Post('signup')
  async signup(@Body() data: signupDto) {
    return await this.userService.signup(data.role, data);
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout() {
    return this.userService.logout();
  }

  @Put('update')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePicture', maxCount: 1 },
      { name: 'coverPicture', maxCount: 1 },
    ]),
  )
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @AuthenticatedUser() user: User,
    @Body() data: updateDto,
    @UploadedFiles()
    files: {
      profilePicture?: Express.Multer.File[];
      coverPicture?: Express.Multer.File[];
    },
  ) {
    let profilePictureUrl = '';
    if (files.profilePicture) {
      profilePictureUrl = await uploadFile(
        files.profilePicture[0].buffer,
        'profiles/' +
          user.id +
          uuid.v4() +
          files.profilePicture[0].originalname,
      );
    }

    let coverPictureUrl = '';
    if (files.coverPicture) {
      coverPictureUrl = await uploadFile(
        files.coverPicture[0].buffer,
        'covers/' + user.id + uuid.v4() + files.coverPicture[0].originalname,
      );
    }

    return await this.userService.updateUser(user.role, user.id, {
      ...data,
      ...(profilePictureUrl
        ? {
            profilePicture: profilePictureUrl,
          }
        : {}),
      ...(coverPictureUrl
        ? {
            coverPicture: coverPictureUrl,
          }
        : {}),
    });
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}

const supabase = createClient(
  'https://dvwkiejaapnjfirbmasl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2d2tpZWphYXBuamZpcmJtYXNsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3Mzg5ODA2NCwiZXhwIjoxOTg5NDc0MDY0fQ.FFtj5JU49LU9aBvjvKYXNG7ymOUs9kuvffdCf13jtvk',
);

async function uploadFile(file, filename) {
  const { data, error } = await supabase.storage
    .from('pictures')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.log(error);
    return null;
  }

  const url = supabase.storage.from('pictures').getPublicUrl(filename);

  return url.data.publicUrl;
}
