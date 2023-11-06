import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist{

    @Prop()
    name: string;
    @Prop()
    popularity: number;
    @Prop()
    image_url: string;
}