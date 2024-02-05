// src/models/exampleModel.js
const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const ExampleModel = mongoose.model('Examples', exampleSchema);

module.exports = ExampleModel;
