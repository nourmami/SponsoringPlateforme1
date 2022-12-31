import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { loginDto } from './DTO/login.dto';
import { signupDto } from './DTO/signup.dto';
import { userService } from './user.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: userService) {}

  @Get()
  @UseGuards(JwtAuthGuard)

  getUsers(){
    return this.userService.getUsers()
  }

  @Post('login')
  async login(@Body() data : loginDto ){
    return await this.userService.login(data)
  }

  @Post('signup')
  async signup(@Body() data : signupDto):Promise<Partial<User>>{
    return await this.userService.signup(data)
  }

  @Get('logout')
  logout(){
    return this.userService.logout()
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id') id:string){
    return await this.userService.deleteUser(id)
  } 
}
