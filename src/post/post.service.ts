import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postRepo.create(createPostDto);
    return this.postRepo.save(post);
  }

  

  async getPosts(): Promise<Post[]> {
    return await this.postRepo.find();
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.postRepo.findOne({where : { id : id}});
        if (!post) {
            throw new NotFoundException(`post #${id} not found`);
        }
        return post;
    }
  

  async update(id: number, updatePostDto: UpdatePostDto) : Promise<Post>{
    const newEntity = await this.postRepo.preload({id, ...updatePostDto});
    if (!newEntity) {
        throw new NotFoundException(`post #${id} not found`);
    }
    return await this.postRepo.save(newEntity);

  }
  
  

  async deletePost(id: number) {
    return await this.postRepo.delete(id);
  }
  
}
