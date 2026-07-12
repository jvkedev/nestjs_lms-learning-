import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

export class Course {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  level!: string;

  @Prop({ required: true })
  price!: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
