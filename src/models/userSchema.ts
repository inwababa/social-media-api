import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  firstName: string;
  LastName: string;  
  userName: string;
  email: string;
  password: string;
  // Add other user properties as needed
}

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  LastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},
{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
