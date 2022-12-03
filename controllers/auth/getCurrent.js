const getCurrent = async (req, res) => {
  const { email, name, balance } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name,
        email,
        balance,
      },
    },
  });
};

module.exports = getCurrent;
