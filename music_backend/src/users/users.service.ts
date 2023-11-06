import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './Shema/user.schema';

@Injectable()
export class UsersService {
    constructor (@InjectModel(User.name) private userModel: Model<UsersDocument>){}
 
    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({ username }).exec();
    }

    async findById(id: string): Promise<User | undefined> {
        return this.userModel.findById(id).exec();
    }

    async create(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    async appendMusicToUser(id: string, Id: string) {
    const create= await this.userModel.findByIdAndUpdate(id, {$addToSet: {musicId: Id}})

    }
}
