const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔍 Loading MONGO_URI...');
    if (!process.env.MONGO_URI) {
      throw new Error('🚨 .env MONGO_URI is missing! Check your .env file.');
    }

    console.log('🔍 MONGO_URI exists ✅, connecting to MongoDB...');

    // Connect without deprecated options
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

// Optional: Listen for connection events
mongoose.connection.on('connected', () => console.log('🟢 Mongoose connected'));
mongoose.connection.on('error', err => console.error('🔴 Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.log('⚪ Mongoose disconnected'));

module.exports = connectDB;