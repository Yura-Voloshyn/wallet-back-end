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
      type: String
      // required: [true, "Month is required"]
    },
    year: {
      type: String
      // required: [true, "Year is required"]
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
  sum: Joi.number().required()
});

const joiStatisticsSchema = Joi.object({
  month: Joi.string().required(),
  year: Joi.string().required()
});

const schemas = {
  joiTransactionSchema,
  joiStatisticsSchema
};

module.exports = {
  Transaction,
  schemas
};
