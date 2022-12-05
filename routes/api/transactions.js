const express = require("express");

const { transactions: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

// const { validateBody, authenticate } = require("../../middlewares");

// const { schemas } = require("../../models/transaction");

const router = express.Router();

// router.post(
//   "/",
//   authenticate,
//   //   validateBody(schemas.joiTransactionSchema),
//   ctrlWrapper(ctrl.addTransaction)
// );

router.get("/categories", ctrlWrapper(ctrl.getCategories));

module.exports = router;
