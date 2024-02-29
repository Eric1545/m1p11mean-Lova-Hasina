const mongoose = require('mongoose');
const config = require('../config/config');
const { insertDefaultRole } = require('../utils/InsertionDefaultData');

const connectDB = async () => {
  try {
    // offline
    // await mongoose.connect(`mongodb://localhost:27017/${config.database}`);
    //online
    await mongoose.connect(`mongodb+srv://${config.user}:${config.password}@cluster0.2bpwte3.mongodb.net/${config.database}`);
    await insertDefaultRole()
    console.log('base : ', config.database);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
