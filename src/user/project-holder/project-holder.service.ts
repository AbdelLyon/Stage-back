import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateProjectHolderDto } from 'src/dto/create-project-holder.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserRole } from 'src/enum/user-role.enum';
import { ProjectHolder, ProjectHolderDocument } from 'src/schema/project-holder.schema';
import { UserService } from '../user.service';

@Injectable()
export class ProjectHolderService {
  constructor(@InjectModel(ProjectHolder.name) private projectHolderModel: Model<ProjectHolderDocument>, private userService: UserService) { }

  public async create(projectHolder: CreateProjectHolderDto): Promise<ProjectHolderDocument> {

    const user = plainToInstance(CreateUserDto, {
      ...projectHolder,
      role: UserRole.PROJET_HOLDER,
      active: true,
    });

    try {
      const userSaved = await this.userService.createUser(user);
      const userInfo = await new this.projectHolderModel({ user: userSaved.id }).save();
      return await this.findById(userInfo._id);

    } catch (err) {
      throw new ConflictException("L'adresse email est déjà utilisée")
    }
  }

  public async find(): Promise<ProjectHolderDocument[]> {
    return await this.projectHolderModel.find().populate('user');
  }

  public async _findByAuthor(user): Promise<ProjectHolderDocument> {
    return await this.projectHolderModel.findOne({ user }).exec();
  }

  public async findById(id: string): Promise<ProjectHolderDocument> {
    return await this.projectHolderModel.findById(id).populate('user');

  }

  public async _getUserByEmail(email: string): Promise<ProjectHolderDocument> {
    return await this.projectHolderModel.findOne({ email }).exec();
  }

  public async delete(id: string): Promise<ProjectHolderDocument> {
    try {
      return this.projectHolderModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);
    }
  }
}