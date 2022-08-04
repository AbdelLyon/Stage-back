import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JWT_SECRET } from 'src/constant';
import { UserModule } from '../user.module';
import { AuthService } from './auth.service';
import { GuardModule } from 'src/guard/guard.module';
import { MailModule } from 'src/mail/mail.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { ProjectHolderModule } from '../project-holder/project-holder.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({ secret: JWT_SECRET, signOptions: { expiresIn: '3600s' } }),
    GuardModule,
    MailModule,
    ProjectHolderModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
