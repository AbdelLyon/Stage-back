import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessSectorModule } from 'src/manager/businessSector.module';
import { LocationModule } from 'src/manager/location.module';
import { Project, ProjectSchema } from 'src/schema/project.schema';
import { ProjectHolderModule } from 'src/user/project-holder/project-holder.module';
import { UserModule } from 'src/user/user.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
      ProjectHolderModule,
      LocationModule,
      BusinessSectorModule,
      UserModule
   ],

   controllers: [ProjectController],
   providers: [ProjectService],
   exports: [ProjectService]

})
export class ProjectModule { }
