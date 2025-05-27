import { model, Schema, SchemaTypeOptions } from 'mongoose';

export interface IUser {
  username: string
  name: string
  email: string
  password: string
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
}, {
  timestamps: true,
});

const User = model<IUser>('User', UserSchema);

export default User;