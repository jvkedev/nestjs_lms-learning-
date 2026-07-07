import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../auth/user.types';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  strict: true,
  strictQuery: true,
  optimisticConcurrency: true,
})
export class User {
  @Prop({ required: true })
  fname!: string;

  @Prop({ required: true })
  lname!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.STUDENT,
  })
  role!: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
