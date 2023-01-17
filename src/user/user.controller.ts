import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { loginDto } from './DTO/login.dto';
import { signupDto } from './DTO/signup.dto';
import { userService } from './user.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthenticatedUser, RoleInterceptor } from 'src/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: userService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor('user'))
  getMe(@AuthenticatedUser() user: User) {
    return user;
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Post('login')
  async login(@Body() data: loginDto) {
    return await this.userService.login(data);
  }

  @Post('signup')
  async signup(@Body() data: signupDto): Promise<Partial<User>> {
    return await this.userService.signup(data);
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout() {
    return this.userService.logout();
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: number, @Body() data: signupDto) {
    return await this.userService.updateUser(id, data);
  }
  
  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  

}
