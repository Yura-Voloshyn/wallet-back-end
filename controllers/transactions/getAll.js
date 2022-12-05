const { Transaction } = require("../../models");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, ...filter } = req.query;
  const skip = (page - 1) * limit;

  const result = await Transaction.find(
    { owner, ...filter },
    "-createdAt -updatedAt",
    {
      skip,
      limit
    }
  )
    .populate("owner", "email name")
    .sort({ createdAt: -1 });
  console.log(result);
  res.json({
    status: "success",
    code: 200,
    data: {
      result
    }
  });
};

module.exports = getAll;
