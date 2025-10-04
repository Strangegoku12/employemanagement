const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://anany:anany123@cluster0.j0uhrrv.mongodb.net/employmentDB?retryWrites=true&w=majority&appName=Cluster0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(' MongoDB connected successfully');
  } catch (err) {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;
