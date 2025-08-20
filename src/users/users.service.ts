import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    const query = role ? { role } : {};
    const users = await this.userModel
      .find(query)
      .select('-password') // Exclude password field
      .exec();
    
    if (role && !users.length) {
      throw new NotFoundException("Users with specified role not found");
    }
    
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel
      .findById(id)
      .select('-password')
      .exec();
    
    if (!user) {
      throw new NotFoundException("User not found");
    }
    
    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async update(id: string, updateUserDto: updateUserDto) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password')
      .exec();
    
    if (!updatedUser) {
      throw new NotFoundException("User not found");
    }
    
    return updatedUser;
  }

  async updatePassword(id: string, hashedPassword: string) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, { password: hashedPassword }, { new: true })
      .select('-password')
      .exec();
    
    if (!updatedUser) {
      throw new NotFoundException("User not found");
    }
    
    return updatedUser;
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndDelete(id)
      .select('-password')
      .exec();
    
    if (!deletedUser) {
      throw new NotFoundException("User not found");
    }
    
    return deletedUser;
  }

  async deactivateUser(id: string) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .select('-password')
      .exec();
    
    if (!user) {
      throw new NotFoundException("User not found");
    }
    
    return user;
  }
}