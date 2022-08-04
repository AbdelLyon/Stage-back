import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { CreateProjectHolderDto } from 'src/dto/create-project-holder.dto';
import { ProjectHolder } from 'src/schema/project-holder.schema';
import { User } from 'src/schema/user.schema';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) { }


  @Post('/register')
  public async register(@Body() projectHolder: CreateProjectHolderDto): Promise<ProjectHolder> {
    return this.authService.register(projectHolder);
  }

  @Post('/login')
  @UseInterceptors(ClassSerializerInterceptor)
  public async login(@Body() credentials: AuthCredentialsDto): Promise<User> {
    return this.authService.login(credentials);
  }
}
