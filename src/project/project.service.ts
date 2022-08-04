import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { plainToInstance } from "class-transformer";
import { Model } from "mongoose";
import { CreateProjectDto } from "src/dto/create-project.dto";
import { BusinessSectorService } from "src/manager/businessSector.service";
import { LocationService } from "src/manager/location.service";
import { Project, ProjectDocument } from "src/schema/project.schema";
import { User } from "src/schema/user.schema";
import { ProjectHolderService } from "src/user/project-holder/project-holder.service";
import { UserService } from "src/user/user.service";
import { Express } from 'express';

@Injectable()
export class ProjectService {

   constructor(
      @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
      private projectHolderService: ProjectHolderService,
      private locationService: LocationService,
      private businessSectorService: BusinessSectorService,
      private userService: UserService

   ) { }

   public async create(values: CreateProjectDto, user: User, file?: Express.Multer.File): Promise<ProjectDocument> {
      if (values.location && values.businessSector) {
         values.location = (await this.locationService.findById(values.location)).name;
         values.businessSector = (await this.businessSectorService.findById(values.businessSector)).name
      }

      if (file) this.userService.update(user.id, `http://localhost:4000/project/image/${file.filename}`);

      const author = await this.projectHolderService._findByAuthor(user.id);
      return await this.projectModel.create(plainToInstance(CreateProjectDto, { ...values, author: author._id }));

   }

   public async findAllWithPagination(documentsToSkip?: number, limitOfDocuments = 12) {
      const query = this.projectModel
         .find()
         .sort({ _id: 1 })
         .skip(documentsToSkip)

      if (limitOfDocuments) query.limit(limitOfDocuments);
      return query.populate({ path: 'author', populate: { path: 'user' } });
   }

   public async countProjects(values): Promise<number> {
      try {
         if (values.location && values.businessSector) {
            values.location = (await this.locationService.findById(values.location)).name;
            values.businessSector = (await this.businessSectorService.findById(values.businessSector)).name
         }

         let res;
         if (values.city || values.location || values.businessSector) {
            if (values.city && values.location && values.businessSector)
               res = this.projectModel.find({ city: values.city, location: values.location.name, businessSector: values.businessSector.name })
            else if (values.location)
               res = this.projectModel.find({ location: values.location.name })
            else
               res = this.projectModel.find({ city: values.city })
         } else {
            res = this.projectModel.find();
         }

         return res.countDocuments({}, (err, nbr) => {
            if (err) console.log(err)
            return nbr
         });

      } catch (err) { console.log(err) }
   }

   public async findById(id: string): Promise<ProjectDocument> {

      return this.projectModel.findById(id).populate({ path: 'author', populate: { path: 'user' } });
   }

   public async findFilterWithPagination(city?: string, locationId?: string, businessSectorId?: string, documentsToSkip?: number, limitOfDocuments = 12): Promise<ProjectDocument[]> {

      const location = await this.locationService.findById(locationId);
      const businessSector = await this.businessSectorService.findById(businessSectorId);
      let query;

      if (city && locationId && businessSectorId) query = this.projectModel.find({ city, location: location.name, businessSector: businessSector.name });
      else if (locationId) query = this.projectModel.find({ location: location.name });
      else query = this.projectModel.find({ city })

      query.sort({ _id: 1 })
         .skip(+documentsToSkip)
      if (limitOfDocuments) query.limit(limitOfDocuments);

      if (!await query) throw new HttpException('Projects introuvable', HttpStatus.NOT_FOUND);

      return query.populate({ path: 'author', populate: { path: 'user' } });
   }

   public async delete(id: string): Promise<ProjectDocument> {
      try {
         return this.projectModel.findByIdAndDelete(id);
      } catch (error) {
         throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);
      }
   }

}

