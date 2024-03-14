const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model("Class", classSchema);
