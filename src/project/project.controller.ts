import { Body, Controller, Delete, Get, Param, Post, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import { CreateProjectDto } from "src/dto/create-project.dto";
import { PaginationParamsDto } from "src/dto/pagination-params.dto";
import { ProjectHolderAuthGuard } from "src/guard/project-holder.guard";
import { ProjectDocument } from "src/schema/project.schema";
import { ProjectService } from "./project.service";

@Controller('project')
export class ProjectController {

   constructor(private projectService: ProjectService) { }

   @Post('/new')
   @UseGuards(ProjectHolderAuthGuard)
   // @UseGuards(JwtAuthGuard)
   @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
         destination: (req, file, cb) => cb(null, './src/uploads/images'),
         filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
      }),
   }))
   public async create(@Body() values: CreateProjectDto, @Request() req, @UploadedFile() file?: Express.Multer.File): Promise<ProjectDocument> {
      return this.projectService.create(values, req.user, file)
   }

   @Get('/image/:filename')
   // @UseGuards(JwtAuthGuard)
   public async getImage(@Param('filename') filename, @Res() res: Response) {
      res.header('Access-Control-Allow-Origin', '*');
      return res.sendFile(filename, { root: './src/uploads/images' })
   }

   @Get('/')
   // @UseGuards(JwtAuthGuard)
   public async findAllWithPagination(@Query() { skip }: PaginationParamsDto) {
      return await this.projectService.findAllWithPagination(+skip);
   }

   @Get('/count')
   public async countProjects(@Query() values): Promise<number> {

      return this.projectService.countProjects(values);
   }

   @Get('/filter')
   // @UseGuards(JwtAuthGuard)
   public async findFilterWithPagination(@Query() { city, locationId, businessSectorId, skip }: PaginationParamsDto): Promise<ProjectDocument[]> {

      return this.projectService.findFilterWithPagination(city, locationId, businessSectorId, skip);
   }

   @Get('/:id')
   // @UseGuards(JwtAuthGuard)
   public async findById(@Param('id') id: string): Promise<ProjectDocument> {
      return this.projectService.findById(id);
   }

   @Delete('/delete/:id')
   // @UseGuards(ProjectHolderAuthGuard)
   public async delete(@Param('id') id: string): Promise<ProjectDocument> {
      return this.projectService.delete(id);
   }


}