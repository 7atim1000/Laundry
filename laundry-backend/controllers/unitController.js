const Unit = require('../models/unitModel');

const addUnit = async(req, res, next) => {
   
    try {

        const { unitName } = req.body;
        if (!unitName) {
            res.status(400).json({ success: false, message: 'Provide Unit name field' })
        }

        const isPresentUnit = await Unit.findOne({ unitName })
        if (isPresentUnit) {
            res.status(400).json({ success: false, message: 'Unit name already exist' })

        } else {
            const unit = { unitName };
            const newUnit = Unit(unit);
            await newUnit.save();

            res.status(200).json({ status: true, message: 'Unit added to units menu ...', data: newUnit })

        };

        
    } catch (error) {
        next(error)
    }
};


const getUnits = async(req, res, next) =>{
    
    try {
        const units = await Unit.find();
        res.status(200).json({ message: 'All units fetched successfully', success: true, units, data: units })
        
    } catch (error) {
        next(error)
    }

};



const removeUnit = async(req, res, next) => {
    try {

        await Unit.findByIdAndDelete(req.body.id)
        res.json({ success: true, message : 'Unit removed Successfully' })
        
    } catch (error) {
        next(error)
    }
}


module.exports = { addUnit, getUnits, removeUnit };