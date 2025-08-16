const express = require('express');
// const uploadSingleImage = require('../middleware/upload');
const upload = require('../middleware/multer')

const { isVerifiedUser } = require('../middleware/tokenVerification');
const { addService, updateService, getServices, removeService ,updateBuyQuantities ,updateSaleQuantities} = require('../controllers/serviceController');


const router = express.Router();

// router.post('/', 
//   (req, res, next) => {
//     console.log('Before Multer - Headers:', req.headers);
//     next();
//   },
//   uploadSingleImage('image'), // Use the wrapped middleware
//   (req, res, next) => {
//     console.log('After Multer - File:', req.file);
//     next();
//   },

//   addService
// );
// router.post('/', uploadSingleImage('image'), addService);

router.post('/', upload.single('image'), isVerifiedUser, addService);
router.put('/:id', upload.single('image'), isVerifiedUser, updateService);



// router.route('/').post(isVerifiedUser, addService);
router.route('/').get(isVerifiedUser, getServices);
router.route('/remove').post(isVerifiedUser, removeService);

router.route('/update-buyquantities').post(isVerifiedUser, updateBuyQuantities);
router.route('/update-salequantities').post(isVerifiedUser, updateSaleQuantities);


module.exports = router;

