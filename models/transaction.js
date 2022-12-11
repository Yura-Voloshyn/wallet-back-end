const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const transactionSchema = new Schema(
  {
    date: {
      type: String,
      required: [true, "Date is required"]
    },
    month: {
      type: Number
    },
    year: {
      type: Number
    },
    type: {
      type: Boolean,
      required: [true, "Type is required"]
    },
    category: {
      type: String,
      required: true,
      default: "Income"
    },
    comment: {
      type: String,
      required: true,
      default: ""
    },
    sum: {
      type: Number,
      min: 0.01,
      required: [true, "Sum is required"]
    },
    balance: {
      type: Number,
      required: [true, "Balance is required"],
      default: 0
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true
    }
  },
  { versionKey: false, timestamps: true }
);

transactionSchema.post("save", handleSaveErrors);

const Transaction = model("transaction", transactionSchema);

const joiTransactionSchema = Joi.object({
  date: Joi.string().required(),
  type: Joi.boolean().required(),
  category: Joi.string().required(),
  comment: Joi.string().min(1).required(),
  sum: Joi.number().min(0.01).required()
});

const joiStatisticsSchema = Joi.object({
  month: Joi.number().required(),
  year: Joi.number().required()
});

const schemas = {
  joiTransactionSchema,
  joiStatisticsSchema
};

module.exports = {
  Transaction,
  schemas
};
