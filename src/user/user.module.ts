import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserExistsRule } from 'src/validator/user.validator';
import { MailModule } from 'src/mail/mail.module';
import { User, UserSchema } from 'src/schema/user.schema';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema, }]),
    MailModule,
  ],
  exports: [UserService],
  providers: [UserService, UserExistsRule],
})
export class UserModule { }
