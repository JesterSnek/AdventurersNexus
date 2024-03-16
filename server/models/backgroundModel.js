const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const backgroundSchema = new Schema({
  name: String,
  description: String,
  equipment: [String],
  languages: [String],
  skillProficiencies: [String],
  toolProficiencies: [String],
  feature: {
    name: {
      type: String,
      //required: true,
    },
    description: {
      type: String,
      //required: true,
    },
  },
  personalityTraits: String,
  ideals: String,
  bonds: String,
  flaws: String,
  isCustom: {
    type: Boolean,
    default: false,
  },
});

//const Background = mongoose.model("Background", backgroundSchema);
module.exports = backgroundSchema;
