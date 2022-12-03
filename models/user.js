const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 1,
      maxLength: 12,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      minLength: 10,
      maxLength: 63,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  name: Joi.string().min(1).max(12).required(),
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required(),
  password: Joi.string().min(6).max(16).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required(),
  password: Joi.string().min(6).max(16).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = {
  User,
  schemas,
};
