import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Musics, MusicsSchema } from './schema/musicSchema';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [MongooseModule.forFeature([{name: Musics.name , schema: MusicsSchema}]), UsersModule],
    controllers: [MusicController],
    providers: [MusicService],
  })

  
export class MusicModule {
    
    
}
