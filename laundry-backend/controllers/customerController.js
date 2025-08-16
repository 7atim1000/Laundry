const Customers = require('../models/customerModel');
const {mongoose} = require('mongoose') ;

const addCustomer = async(req, res, next) => {
    
    try {
        const { customerName , customerEmail, contactNo, address, balance } = req.body ;
        if(!customerName || !customerEmail || !contactNo || !address ) {
            res.status(400).json({success :false, message :"Please provide all fields"})
        };

        const isCustomerPresent = await Customers.findOne({customerName});
        
        if (isCustomerPresent) {
            res.status(200).json({ success :true, message :'This customer already exist'}) 
        // validating email
        if (!validator.isEmail(customerEmail)) {
            return res.json({ success :false, message :'Please enter a valid email'})
        }
        
        } else{
            
            const customer = { customerName , customerEmail, contactNo, address, balance } ;
        
            const newCustomer = Customers(customer);
            await newCustomer.save();

            res.status(201).json({ success: true, message: 'New customer added Successfully', data: newCustomer });
        }
    

    } catch (error) {
        next(error)
    }
};


const getCustomers = async(req, res, next) => {

    try {
        const customers = await Customers.find()
        res.status(200).json({ success: true, message: 'All customers fetch successfully', customers, data: customers })    

    } catch (error) {
        next(error);
    }
  
};

const removeCustomer = async(req, res, next) => {
    
    try {
        await Customers.findByIdAndDelete(req.body.id)
        res.json({ success: true, message : 'Selected customer removed Successfully .' })
        
    } catch (error) {
        
    }
}



const updateCustomerBalance = async (req, res, next) => {
   
    try {

        const { balance } = req.body;
        const { id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, "Invalid Id");
            return next(error);
        };

        const customer = await Customers.findByIdAndUpdate(
            id,
            
            { balance },
            { new : true }
        );

       
        if (!customer) {
            const error = createHttpError(404, 'Customer is not Exist!');
            return error;
        }

        res.status(200).json({ success: true, message: 'Customer balance updated successfully..', data: customer })
        
    } catch (error) {
        next(error)
    }

}


module.exports = { addCustomer, getCustomers, removeCustomer, updateCustomerBalance }
