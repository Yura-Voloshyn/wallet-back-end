const { Transaction, User } = require("../../models");

const addTransaction = async (req, res) => {
  const { _id: owner, balance } = req.user;
  const { sum, type } = req.body;

  const result = await Transaction.create({ ...req.body, owner });

  let newBalance;

  if (type) {
    newBalance = balance + sum;
  }
  if (!type) {
    newBalance = balance - sum;
  }

  await User.findByIdAndUpdate(owner, { balance: newBalance });
  await Transaction.findByIdAndUpdate(result, { balance: newBalance });

  //   res.status(201).json({ ...req.body, owner, balance: newBalance });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      ...req.body,
      owner,
      balance: newBalance,
    },
  });
};

module.exports = addTransaction;
