import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuardModule } from './guard/guard.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './user/auth/auth.module';
import { ProjectHolderModule } from './user/project-holder/project-holder.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, GuardModule, UserModule, ProjectHolderModule, ProjectModule, ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: `mongodb://${configService.get<string>('MONGO_URI')}/${configService.get<string>('MONGO_DB_NAME')}`,
          user: configService.get<string>('MONGO_USERNAME'),
          pass: configService.get<string>('MONGO_PASSWORD'),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
