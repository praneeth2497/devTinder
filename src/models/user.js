const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address:" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("please enter strong password:" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender type`,
      },
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "www.google.com",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url:" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is default about user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  //create a jwt token
  const token = await jwt.sign({ _id: user._id }, "DEV@TINDER$798", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.passwordValidation = async function (passwordByInputUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordByInputUser,
    passwordHash,
  );
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
