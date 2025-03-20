const { Op } = require('sequelize');
const { sequelize } = require('../../config/db');
const User = require('../models/User');

const updateUserBalance = async (userId, amount) => {
    return sequelize.transaction(async (t) => {
        const user = await User.findOne({ where: { id: userId }, transaction: t });

        if (!user) {
            throw new Error("❌ User not found");
        }

        if (user.balance < amount) {
            throw new Error("❌ There are insufficient funds on the balance.");
        }

        const [updatedRows, [updatedUser]] = await User.update(
            { balance: sequelize.literal(`balance + ${amount}`) },
            {
                where: {
                    id: userId,
                    balance: { [Op.gte]: amount }
                }, 
                returning: true, 
                transaction: t
            }
        );

        if (updatedRows === 0) {
            throw new Error("❌ Update failed");
        }

        return updatedUser[0].balance;
    });
};

module.exports = { updateUserBalance };