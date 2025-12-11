const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://irahularora:MP02fEEYOEN3ndA9@cluster0.nqrp5ng.mongodb.net/mynotebook?retryWrites=true&w=majority';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to the database');
    return true;
  } catch (error) {
    console.log('Error connecting to the database:', error);
    return false;
  }
};

module.exports = connectToMongo;
