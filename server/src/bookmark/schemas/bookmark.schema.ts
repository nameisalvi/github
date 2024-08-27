import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookmarkDocument = Bookmark & Document;

@Schema({ timestamps: true })
export class Bookmark {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  repositoryId: number;

  @Prop({ required: true })
  repositoryName: string;

  @Prop({ required: true })
  repositoryUrl: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
