import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectHolder, ProjectHolderSchema } from 'src/schema/project-holder.schema';
import { UserModule } from '../user.module';
import { ProjectHolderController } from './project-holder.controller';
import { ProjectHolderService } from './project-holder.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProjectHolder.name, schema: ProjectHolderSchema, }]),
    UserModule
  ],
  controllers: [ProjectHolderController],
  providers: [ProjectHolderService],
  exports: [ProjectHolderService],
})
export class ProjectHolderModule { }
