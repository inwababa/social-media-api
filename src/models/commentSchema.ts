import mongoose, { Schema, Document } from 'mongoose';

export interface Comment extends Document {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  text: string;
}

const commentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  text: { type: String, required: true },
},
{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
});

const CommentModel = mongoose.model<Comment>('Comment', commentSchema);

export default CommentModel;
