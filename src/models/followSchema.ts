import mongoose, { Schema, Document } from 'mongoose';

// Define interface for Follow document
interface FollowDocument extends Document {
  followerId: mongoose.Types.ObjectId;
  followeeId: mongoose.Types.ObjectId;
}

// Define schema for Follow collection
const FollowSchema: Schema = new Schema({
  followerId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, 
  followeeId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
},
{
  timestamps: {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
});

// Create and export Follow model
const FollowModel = mongoose.model<FollowDocument>('Follow', FollowSchema);

export default FollowModel;
