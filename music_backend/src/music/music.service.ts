import { Injectable } from '@nestjs/common';
import { Musics, MusicsDocument } from './schema/musicSchema';
import { Query  } from 'express-serve-static-core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Music } from './model/music.model';
import { UsersService } from 'src/users/users.service';
import { User, UsersDocument } from 'src/users/Shema/user.schema';
import { privateDecrypt } from 'crypto';

@Injectable()
export class MusicService {
    constructor(@InjectModel(Musics.name) 
    private userModel: Model<UsersDocument>,
    private musicModel: Model<MusicsDocument>,
    private userService: UsersService){}


      // async getMusics(query: Query): Promise<Musics[]> {
    //     const page=Number(query.page);
    //     const limit=Number(query.limit);

    //     const skip=limit*(page-1);

    //     const title= query.title ? {
    //         genre_ids : {
    //             $regex : query.title,
    //             $options: 'i',
    //         }
    //     } : {};
        
    //     return await this.musicModel.find(title).limit(limit).skip(skip);
    // }
    async getMusics(): Promise<Musics[]>{
        return await this.musicModel.find().exec();
    }


    // async getMusics(userId: string): Promise<Musics[]> {
    //     return await this.musicModel.find({
    //         $or: [
    //             { creatorId: userId },
    //             { creatorId: { $exists: false } }
    //         ]
    //     }).exec();
    // }
    

    async getMusic(id: string){
        return await this.musicModel.findById(id);
    }

    async createMusic(music: Music, id: string): Promise<Musics> {
        const createdMusic = await this.musicModel.create(music);
        await this.userService.appendMusicToUser(id, createdMusic.id)
        return createdMusic

    }


    async findByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).exec();
      }

    async updateMusic(id: string, music: Music): Promise<Musics>{
        return await this.musicModel.findByIdAndUpdate(id,music,
            {
                returnOriginal: false
            })
    }

    async deleteMusic(id: string): Promise<Musics>{
        return await this.musicModel.findByIdAndDelete(id,
            {
                returnOriginal: false
            });
    }

}
