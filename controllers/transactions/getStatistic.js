const { Transaction } = require("../../models");

const getStatistic = async (req, res) => {
  const { _id: owner } = req.user;
  const { month, year } = req.body;
  // const { month, year } = req.params;
  // const { month, year } = req.query;

  const resultIncome = await Transaction.aggregate([
    {
      $match: {
        owner: owner,
        type: true,
        month: month,
        year: year
      }
    },
    {
      $group: {
        _id: null,
        totalSum: { $sum: "$sum" }
      }
    }
  ]);

  const totalIncome = resultIncome.reduce((acc, el) => acc + el.totalSum, 0);

  const resultExpense = await Transaction.aggregate([
    {
      $match: {
        owner: owner,
        type: false,
        month: month,
        year: year
      }
    },
    {
      $group: {
        _id: null,
        totalSum: { $sum: "$sum" }
      }
    }
  ]);

  const totalExpense = resultExpense.reduce((acc, el) => acc + el.totalSum, 0);

  const totalCategories = await Transaction.aggregate([
    {
      $match: {
        owner: owner,
        type: false,
        month: month,
        year: year
      }
    },
    {
      $group: {
        _id: "$category",
        totalSum: { $sum: "$sum" }
      }
    }
  ]);

  res.json({
    status: "success",
    code: 200,
    data: {
      owner,
      totalIncome,
      totalExpense,
      totalCategories
    }
  });
};

module.exports = getStatistic;
