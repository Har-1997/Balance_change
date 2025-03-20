const express = require('express');
const { updateBalance } = require('../controllers/userController');
const validator = require('../middlewares/validate');
const { validBalanceUpdate } = require('../validations/userValidation');
const router = express.Router();

router.put('/users/update_balance', validator(validBalanceUpdate), updateBalance);

module.exports = router;