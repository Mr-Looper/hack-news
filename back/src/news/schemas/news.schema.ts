import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema()
export class News extends Document {
  @Prop({ unique: true })
  id: string;

  @Prop()
  author: string;

  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop()
  date: string;

  @Prop()
  deleted: boolean;
}

export const NewsSchema = SchemaFactory.createForClass(News);
