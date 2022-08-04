import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { ResetPasswordDto } from 'src/dto/reset-password.dto';
import { TemplateOptions } from 'src/interface/mail.interface';
import { SendMailService } from 'src/mail/send-mail.service';
import { UserService } from '../user.service';
import { User } from 'src/schema/user.schema';
import { ProjectHolderService } from '../project-holder/project-holder.service';
import { CreateProjectHolderDto } from 'src/dto/create-project-holder.dto';
import { ProjectHolder } from 'src/schema/project-holder.schema';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private projectHolder: ProjectHolderService, private jwtService: JwtService, private sendMailService: SendMailService) { }

  public async validateUser(email: string): Promise<User> { return this.userService.validUser(email) }

  public async register(newProjectHolder: CreateProjectHolderDto) {
    await this.projectHolder.create(newProjectHolder);
    const user = await this.userService.loginUser(newProjectHolder.email, newProjectHolder.password);
    delete user.password;
    return plainToInstance(ProjectHolder, { ...user, token: this.jwtService.sign({ email: user.email, id: user.id, role: user.role, active: user.active }) });
  }


  public async login(credentials: AuthCredentialsDto): Promise<User> {
    const user = await this.userService.loginUser(credentials.email, credentials.password);
    delete user.password;
    return plainToInstance(User, { ...user, token: this.jwtService.sign({ email: user.email, id: user.id, role: user.role, active: user.active }) });
  }

  public async requestResetPassword(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      const token = this.jwtService.sign(
        { id: user.id, email: user.email, role: user.role, active: user.active, resetPassword: true },
        { expiresIn: '300s' }
      );

      const options: TemplateOptions = {
        data: { firstname: 'Ici le nom ', lastname: 'Ici le prénom', url: `/reset-password?token=${token}` },
        template: 'request-reset-password',
        mailOptions: { from: process.env.MAIL_FROM, subject: 'Mot de passe oublié', html: null, to: email },
      };
      this.sendMailService.send(options);
    }
  }

  public async resetPassword(resetPassword: ResetPasswordDto) {
    try {
      this.jwtService.verify(resetPassword.token);
      const user: any = this.jwtService.decode(resetPassword.token);
      if (user.resetPassword)
        this.userService.setPassword(resetPassword.newPassword, user.email)
      else throw new Error();
    } catch (err) {
      throw new HttpException(`Token expiré. Merci d'envoyer une nouvelle demande`, HttpStatus.FORBIDDEN);
    }
  }

  public async changeMyPassword(oldPassword: string, newPassword: string, email: string): Promise<boolean> {
    return this.userService.changeMyPassword(oldPassword, newPassword, email);
  }
}
