const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const emailRegexp = /^[^\W][a-zA-Z0-9._-]{1,}@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
// const emailRegexp = /^[^\W][a-zA-Z0-9._-]{1,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const nameRegexp = /^[а-яА-ЯїЇіІєЄa-zA-Z0-9]{1,12}$/;
const passwordRegexp = /^[\w~'`!@#№?$%^&*()=+<>|/\\.,:;[\]{}"\x-]+$/;
// const passwordRegexp = /^[a-zA-Z0-9]+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 1,
      maxLength: 12,
      match: nameRegexp,
      required: [true, "Name is required"]
    },
    password: {
      type: String,
      minLength: 6,
      match: passwordRegexp,
      required: [true, "Password is required"]
    },
    email: {
      type: String,
      minLength: 10,
      maxLength: 63,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true
    },
    balance: {
      type: Number,
      required: true,
      default: 0
    },
    token: {
      type: String,
      default: ""
    }
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).min(1).max(12).required(),
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required(),
  password: Joi.string().pattern(passwordRegexp).min(6).max(12).required()
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required(),
  password: Joi.string().min(6).max(12).required()
});

const schemas = {
  registerSchema,
  loginSchema
};

module.exports = {
  User,
  schemas
};
