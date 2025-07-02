import { Document, model, Schema, SchemaTypeOptions } from 'mongoose';

export interface IUser extends Document{
  username: string
  name: string
  email: string
  password: string
  description: string,
  image: string
}

const UserSchema = new Schema<IUser, SchemaTypeOptions<string>>({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
});

const User = model<IUser>('User', UserSchema);

export default User;