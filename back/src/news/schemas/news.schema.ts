import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema()
export class News extends Document {
  @Prop()
  title: string;

  @Prop()
  date: string; 
}

export const NewsSchema = SchemaFactory.createForClass(News);