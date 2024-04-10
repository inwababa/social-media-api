import mongoose, { Document, Schema } from 'mongoose';

export interface Notification extends Document {
  recipientId: string;
  type: string;
  postId?: string; // Only applicable for 'like' and 'comment' notifications
  createdAt: string;
}

const NotificationSchema: Schema = new Schema({
  recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['mention', 'like', 'comment'], required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
},
{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
});

const NotificationModel = mongoose.model<Notification>('Notification', NotificationSchema);

export default NotificationModel;
