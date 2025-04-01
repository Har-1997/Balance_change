const { Op } = require('sequelize');
const { sequelize } = require('../../config/db');
const User = require('../models/User');

const updateUserBalance = async (userId, amount) => {
    const [updatedRows, [updatedUser]] = await User.update(
        { balance: sequelize.literal(`balance - ${amount}`) },
        {
            where: {
                id: userId,
                balance: { [Op.gte]: amount }
            },
            returning: true
        }
    );

    if (updatedRows === 0) {
        throw new Error("❌ Update failed: Insufficient balance or user not found.");
    }
    return updatedUser.balance;
};

module.exports = { updateUserBalance };