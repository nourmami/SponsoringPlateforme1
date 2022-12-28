import { Body, Controller, Get, Post } from '@nestjs/common';
import { loginDto } from './DTO/login.dto';
import { signupDto } from './DTO/signup.dto';
import { userService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: userService) {}

  @Get()
  getUsers(){
    return this.userService.getUsers()
  }

  @Post('login')
  login(@Body() data : loginDto ){
    return this.userService.login(data)
  }

  @Post('signup')
  signup(@Body() data : signupDto):Promise<Partial<User>>{
    return this.userService.signup(data)
  }

  @Get('logout')
  logout(){
    return this.userService.logout()
  }


}
