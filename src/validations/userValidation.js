const { body } = require("express-validator");

const userId = body('userId').isInt({ min: 1 }).withMessage('Invalid userId, must be a positive integer');
const amount = body('amount').isInt().withMessage('Invalid amount, must be an integer');

const validBalanceUpdate = [ amount, userId ];

module.exports = { validBalanceUpdate };