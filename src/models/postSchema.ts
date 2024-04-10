import mongoose, { Schema, Document } from 'mongoose';

export interface Post extends Document {
  user: mongoose.Types.ObjectId;
  text: string;
  attachment?: string;
  createdAt: string;
  updatedAt: string;
}

const postSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  attachment: { type: String },
},
{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
});

const PostModel = mongoose.model<Post>('Post', postSchema);

export default PostModel;
