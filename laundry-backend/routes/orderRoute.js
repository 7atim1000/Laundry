const express = require('express');

const  { isVerifiedUser }  = require("../middleware/tokenVerification");
const { addOrder, getOrders,updateOrder, getOrderCustomer } = require("../controllers/orderController");

const router = express.Router();

router.route('/').post(isVerifiedUser, addOrder);
router.route('/fetch').post(isVerifiedUser, getOrders);
router.route('/:id').put(isVerifiedUser, updateOrder);

router.route('/orderCustomer').post(isVerifiedUser, getOrderCustomer);

module.exports = router ;
