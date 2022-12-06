const { Transaction, User } = require("../../models");

const addTransaction = async (req, res) => {
  const { _id: owner, balance } = req.user;
  const { sum, type, date } = req.body;
  const year = date.slice(6);
  const month = date.slice(3, 5);

  const result = await Transaction.create({ ...req.body, owner });

  let newBalance;

  if (type) {
    newBalance = balance + Number(sum);
  }
  if (!type) {
    newBalance = balance - Number(sum);
  }

  await User.findByIdAndUpdate(owner, { balance: newBalance });
  await Transaction.findByIdAndUpdate(result, { balance: newBalance });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      ...req.body,
      year,
      month,
      owner,
      balance: newBalance
    }
  });
};

module.exports = addTransaction;
