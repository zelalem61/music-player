import { Controller, Get, Query, Param, Post, Body, Put, Delete, Req } from '@nestjs/common';
import { MusicService } from './music.service';
import { Music } from './model/music.model';
import { Musics, MusicsDocument } from './schema/musicSchema';
import { UsersService } from 'src/users/users.service';

@Controller('music')
export class MusicController {

    constructor(private musicService: MusicService, private userService: UsersService){
        
    }

    // @Get()
    // async getMusics(@Query() query): Promise<Musics[]>{
    //     return await this.musicService.getMusics(query);
    // }

    @Get()
    async getMusics(): Promise<Musics[]>{
        return await this.musicService.getMusics();
    }

    @Get('/:id')
    async getMusic(@Param('id') id: string): Promise<Musics>{
        return await this.musicService.getMusic(id);

    }

    @Get('/:username')
    async getUserByUsername(@Param('username') username: string) {
        return await this.musicService.findByUsername(username);
    }
   

    @Post('/:id')
    async createMusic(@Body() music: Music, @Param('id') id: string): Promise<Musics>{
        return await this.musicService.createMusic(music, id);
    }




    @Put('/:id')
    async updateMusic(@Body() music: Music, @Param('id') id: string): Promise<Musics>{
        return await this.musicService.updateMusic(id,music);
    }
   

    
    @Delete('/:id')
    async deleteMusic(@Param('id') id: string): Promise<Musics>{
        return await this.musicService.deleteMusic(id);
    }

    
}
