const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Cluster23103:ZVhFcFdtWGR9@cluster23103.zh4h51z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster23103', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;