const { Transaction, User } = require("../../models");

const addTransaction = async (req, res) => {
  const { _id: owner, balance } = req.user;
  const { sum, type, date } = req.body;
  // const year = date.slice(6);
  // const month = date.slice(3, 5);
  const year = Number(date.slice(6));
  const month = Number(date.slice(3, 5));

  const result = await Transaction.create({ ...req.body, month, year, owner });

  let newBalance;

  if (type) {
    newBalance = Number(balance) + Number(sum.toFixed(2));
  }
  if (!type) {
    newBalance = Number(balance) - Number(sum.toFixed(2));
  }

  const currentSum = Number(sum.toFixed(2));

  await User.findByIdAndUpdate(owner, {
    balance: newBalance.toFixed(2),
    sum: currentSum
  });
  await Transaction.findByIdAndUpdate(result, {
    balance: newBalance.toFixed(2),
    sum: currentSum
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      ...req.body,
      year,
      month,
      owner,
      sum: currentSum,
      balance: newBalance
    }
  });
};

module.exports = addTransaction;
