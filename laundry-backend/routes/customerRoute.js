const express = require('express');
const { isVerifiedUser } = require('../middleware/tokenVerification');
const { addCustomer, getCustomers, removeCustomer, updateCustomerBalance } = require('../controllers/customerController');


const router = express.Router();

router.route('/').post(isVerifiedUser, addCustomer)
router.route('/').get(isVerifiedUser, getCustomers)
router.route('/remove').post(isVerifiedUser, removeCustomer);
router.route('/:id').put(isVerifiedUser, updateCustomerBalance);

module.exports = router ;