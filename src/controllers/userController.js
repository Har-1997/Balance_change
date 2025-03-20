const { updateUserBalance } = require('../services/userService');

const updateBalance = async (req, res, next) => {
  try {
    const { userId, amount } = req.body;
    const balance = await updateUserBalance(userId, amount);

    return res.status(200).json({ balance });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateBalance };
