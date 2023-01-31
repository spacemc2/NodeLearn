const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const petschema = new Schema({
    name: String,
    description: String
  });

//   create a model
const pets = mongoose.model('test1',petschema)

module.exports = pets;    