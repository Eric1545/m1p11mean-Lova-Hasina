const ExampleModel = require("../models/ExempleModel");

async function getData() {
  try {
    const examples = await ExampleModel.find({});
    return examples;
  } catch (error) {
    console.error('Error fetching data from database:', error);
    throw error;
  }
}

function processPostData(postData) {
  const exampleModel = new ExampleModel(postData);
  exampleModel.save();
  return 'Données postées traitées avec succès';
}

module.exports = {
  getData,
  processPostData,
};
