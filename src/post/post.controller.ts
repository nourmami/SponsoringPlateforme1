import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from './../user/entities/user.entity';
import { JwtAuthGuard } from './../user/guards/jwt-auth.guard';
import { AuthenticatedUser } from 'src/common/decorators';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { createClient } from '@supabase/supabase-js';
import * as uuid from 'uuid';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: editFileName,
  //     }),
  //   }),
  // )
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @AuthenticatedUser() user: User,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const photo = await uploadFile(
      file.buffer,
      'profiles/' + uuid.v4() + file.originalname,
    );

    return this.postService.create({
      ...createPostDto,
      photo,
      user,
    });
  }

  @Get()
  findAll() {
    return this.postService.getPosts();
  }

  @Get('myposts')
  @UseGuards(JwtAuthGuard)
  getMe(@AuthenticatedUser() user: User) {
    return this.postService.getMyPosts(user.id);
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(+id);
  }

  @Get('/user/:id')
  getPostsByUser(@Param('id') id: string) {
    return this.postService.getPostsByUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postService.deletePost(id);
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
