import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { SALT_ROUNDS } from 'src/constant';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  public async createUser(user: CreateUserDto): Promise<User> {

    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    const createdModel = new this.userModel(user);
    const userCreated = await createdModel.save();
    return new User({ ...userCreated.toJSON() });
  }

  public async update(userId: string, filename: string): Promise<UserDocument> {
    const currentUser = await this._getUserById(userId);
    return this.userModel.findByIdAndUpdate(currentUser._id, { imageFile: filename });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? new User({ ...user.toJSON() }) : null;
  }

  public async _getUserByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  public async _getUserById(_id: string): Promise<UserDocument> {
    return await this.userModel.findOne({ _id }).exec();
  }

  public async setPassword(password: string, email: string): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();
    user.password = await bcrypt.hash(password, SALT_ROUNDS);
    user.save();
  }

  public async loginUser(email: string, password: string): Promise<User> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException('Email ou mot de passe incorrecte', HttpStatus.BAD_REQUEST);
    } else {
      if (await this.isSamePassword(password, user.password)) {
        if (!user.active) throw new HttpException('Votre compte est désactivé', HttpStatus.BAD_REQUEST);
        return user;
      } else {
        throw new HttpException('Email ou mot de passe incorrecte', HttpStatus.BAD_REQUEST);
      }
    }
  }

  public async validUser(email: string): Promise<User> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException('Email ou mot de passe incorrecte', HttpStatus.BAD_REQUEST);
    } else {
      if (!user.active) throw new HttpException('Votre compte est désactivé', HttpStatus.BAD_REQUEST);
      else return user;
    }
  }

  public async changeMyPassword(oldPassword: string, newPassword: string, email: string): Promise<boolean> {
    const user = await this._getUserByEmail(email);
    if (!user) {
      throw new HttpException('Compte Introuvable', HttpStatus.BAD_REQUEST);
    } else {
      if (!await this.isSamePassword(oldPassword, user.password)) {
        throw new HttpException('Le mot de passe actuel est incorrecte', HttpStatus.BAD_REQUEST);
      } else {
        await bcrypt.hash(newPassword, SALT_ROUNDS).save();
        return true;
      }
    }
  }

  public async deleteUser(_id: string): Promise<void> {
    try {
      this.userModel.deleteOne({ _id }).exec();
    } catch (error) {
      throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);
    }
  }

  public async isSamePassword(password: string, cryptPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, cryptPassword);
  }

}
