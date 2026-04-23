const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔍 Checking MONGO_URI...');

    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error('🚨 MONGO_URI is missing in environment variables');
    }

    console.log('🔗 Connecting to MongoDB...');

    await mongoose.connect(MONGO_URI);

    console.log('✅ MongoDB Connected Successfully!');

  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

// 🔹 Connection Events (useful for Render logs)
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 Mongoose error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚪ Mongoose disconnected');
});

module.exports = connectDB;