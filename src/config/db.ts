import mongoose from 'mongoose';

const dbURI = process.env.MONGODB_URI!;


const connectDB = async () => {
    try {
      await mongoose.connect(dbURI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      // Exit the process if unable to connect to the database
      process.exit(1);
    }
  };

export default connectDB;
