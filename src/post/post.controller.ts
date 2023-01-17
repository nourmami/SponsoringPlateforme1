import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from './../user/entities/user.entity';
import { JwtAuthGuard } from './../user/guards/jwt-auth.guard';
import { AuthenticatedUser } from 'src/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {editFileName} from 'src/common/filename';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
    destination: './uploads',
    filename: editFileName,
    }),
    }))  createPost(@Body() createPostDto: CreatePostDto,@UploadedFile() file: Express.Multer.File) {
    return {'post':this.postService.create(createPostDto), 'file':file};
  }

  @Get()
  findAll() {
    return this.postService.getPosts();
  }

  @Get('myposts')
  @UseGuards(JwtAuthGuard)
  getMe(@AuthenticatedUser() user: User) {
    return user.posts;

  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(+id);
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
