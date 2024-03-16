const mongoose = require("mongoose");
const classSchema = require("../models/classModel");

// Middleware

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
