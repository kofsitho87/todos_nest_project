import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({
  versionKey: false,
  collection: 'todos',
})
export class Todo {
  _id: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Boolean, default: false })
  completed: boolean;

  @Prop({ type: String, default: null })
  memo: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
