import mongoose, { Schema, Document } from 'mongoose';

export interface Like extends Document {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
}

const likeSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
},
{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
});

const LikeModel = mongoose.model<Like>('Like', likeSchema);

export default LikeModel;
