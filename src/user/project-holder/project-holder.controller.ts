import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProjectHolderDto } from 'src/dto/create-project-holder.dto';
import { ProjectHolderDocument } from 'src/schema/project-holder.schema';
import { ProjectHolderService } from './project-holder.service';


@Controller('/project-holder')
export class ProjectHolderController {
  constructor(private projectHolderService: ProjectHolderService) { }

  // @Post('/register')
  // public async register(@Body() projectHolder: CreateProjectHolderDto): Promise<ProjectHolderDocument> {
  //   return this.projectHolderService.create(projectHolder);
  // }

  @Get('/')
  public async findAll(): Promise<ProjectHolderDocument[]> {
    return this.projectHolderService.find();
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<ProjectHolderDocument> {
    return this.projectHolderService.findById(id);
  }

  @Delete('/delete/:id')
  public async delete(@Param('id') id: string): Promise<ProjectHolderDocument> {
    return this.projectHolderService.delete(id);
  }

}
