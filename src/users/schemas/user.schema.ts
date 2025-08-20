import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  @Exclude() // This will exclude password from serialization
  password: string;

  @Prop({ required: true, enum: ['INTERN', 'ADMIN', 'ENGINEER'], default: 'INTERN' })
  role: 'INTERN' | 'ADMIN' | 'ENGINEER';

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 });