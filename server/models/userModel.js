const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static register method
userSchema.statics.register = async function (email, username, password) {
  //validation
  if (!email || !password || !username) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  if (!validator.matches(username, "^[a-zA-Z0-9_.-]*$")) {
    throw Error(
      "Please do not use special characters in your username other than a dot or a minus."
    );
  }

  //check if email already exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not a valid email");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  //bcrypt compares the password entered upon the login attempt with the hashed password in the database
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
