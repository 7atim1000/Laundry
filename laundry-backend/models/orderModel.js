const mongoose = require('mongoose') ;

const orderSchema = new mongoose.Schema({
    
    customerDetails: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },

    
    orderDate : {type :Date, required: true},
    receiptDate :{type :Date, required :true},

    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customers' },
    orderType: { type: String },
    shift: { type: String, enum: ['Morning', 'Evening'], required: true },
    orderNumber: { type: String },
    orderStatus: { type: String, required: true },
  
    bills: {
        total: { type: Number, required: true },
        tax: { type: Number, required: true },
        totalWithTax: { type: Number, required: true },

        payed: { type: Number, required: true },
        balance: { type: Number, required: true },
    },

    items: [],
  
    paymentMethod: { type: String },

    date: { type: Date, default: Date.now() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

}, {timestamps :true}) ;


module.exports = mongoose.model('Order', orderSchema);