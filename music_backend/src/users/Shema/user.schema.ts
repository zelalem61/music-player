import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';

@Schema({
    timestamps: true
})

export class User {

    @Prop()
    name: String;

    @Prop()
    username: String;

    @Prop({ unique : [true, "Duplicate email entered"] })
    email: String;

    @Prop()
    password: String;

    @Prop()
    musicId: string[]=[];
}

export type UsersDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User); 