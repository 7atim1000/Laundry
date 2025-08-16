const { mongoose } = require('mongoose');
const Service = require('../models/serviceModel');
const cloudinary = require('cloudinary').v2;

// to implement
// const addService = async (req, res, next) => {
//     try {
//         // Debug logging
//         console.log('==== UPLOAD DEBUG START ====');
//         console.log('Headers:', req.headers);
//         console.log('Body:', req.body);
//         console.log('File:', req.file);
//         console.log('==== UPLOAD DEBUG END ====');

//         // Validate required fields
//         const { category, serviceName, price, unit } = req.body;
//         if (!category || !serviceName || !price || !unit) {
//             return res.status(400).json({ 
//                 status: false, 
//                 message: 'Please provide all required fields' 
//             });
//         }

//         // Check if service exists
//         const isServicePresent = await Service.findOne({ serviceName });
//         if (isServicePresent) {
//             return res.status(400).json({ 
//                 status: false, 
//                 message: 'Service already exists' 
//             });
//         }

//         // Create new service
//         const serviceData = { 
//             category, 
//             serviceName, 
//             price, 
//             unit,
//             image: req.file ? req.file.path : null 
//         };

//         const newService = await Service.create(serviceData);

//         // Return success response
//         return res.status(201).json({
//             status: true,
//             message: 'Service created successfully',
//             data: {
//                 ...newService.toObject(),
//                 // Add public URL if needed
//                 imageUrl: req.file ? `/uploads/services/${req.file.filename}` : null
//             }
//         });

//     } catch (error) {
//         console.error('Error in addService:', error);
//         next(error);
//     }
// };

const addService = async(req, res, next) => {
    try {
      const { category, serviceName, price, unit } = req.body;
      const imageFile = req.file;
      
      // console.log({ category, serviceName, price, unit }, imageFile)
      if(!category ||!serviceName ||!price ||!unit){
        return res.json({ success: false, message :'Missing Details'})
      };

      // validating Email :
      // if (!validator.isEmail(email)) {
      //   return res.json({success :false, message :'Please enter a valid email'})
      // }

      // validating strong password : 
      // if (password.length < 8 ) {
      //   return res.json({ success :false , message :'Please enter a strong password'})
      // }

      // upload image to cloudinary 
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type :"image"})
      const imageUrl = imageUpload.secure_url

      const service = {
        category ,
        serviceName ,
        price , 
        unit, 

        image :imageUrl 
      };

      const newService = new Service(service)
      await newService.save()

      res.json({ success :true, message :'New Service Added'})
       
    } catch (error) {
      console.log(error);
      res.json({ success :false, message :error.message})
    }
};  

// Update Service Controller
const updateService = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { category, serviceName, price, unit } = req.body;
        let imageUrl;

        if(!category || !serviceName || !price || !unit){
            return res.json({ success: false, message: 'Missing Details' });
        }

        // If a new image was uploaded
        if(req.file) {
            const imageUpload = await cloudinary.uploader.upload(req.file.path, {resource_type: "image"});
            imageUrl = imageUpload.secure_url;
        }

        const updateData = {
            category,
            serviceName,
            price, 
            unit
        };

        // Only add image to update if a new one was uploaded
        if(imageUrl) {
            updateData.image = imageUrl;
        }

        const updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true });

        if(!updatedService) {
            return res.json({ success: false, message: 'Service not found' });
        }

        res.json({ success: true, message: 'Service updated', service: updatedService });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const getServices = async(req, res, next) => {
    try {
      const { search } = req.query;
      let query = {};

      if (search) {
        query = {
          $or: [
            { serviceName: { $regex: search, $options: 'i' } }
            // { description: { $regex: search, $options: 'i' } }
            // Add other fields you want to search on
          ]
        };
      }
      
      const services = await Service.find(query);
      res.status(200).json({ 
        success: true,
        message: 'All services fetch successfully', 
        services, 
        data: services})
    
    } catch (error) {
        next(error);
    }
};


const removeService = async(req, res, next) => {
    try {

        await Service.findByIdAndDelete(req.body.id)
        res.json({ success: true, message : 'Selected item removed Successfully' })
    
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message });
    }

}



//exports.updateQuantities = async (req, res) => {
const updateBuyQuantities = async(req, res) => {  
    try {
    const { items } = req.body;
    for (const { id, quantity } of items) {
      await Service.findByIdAndUpdate(id, { $inc: { qty: +quantity } }); // subtract purchased qty
    }
    res.status(200).json({ success: true, message: 'Quantities updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSaleQuantities = async(req, res) => {  
    try {
    const { items } = req.body;
    for (const { id, quantity } of items) {
      await Service.findByIdAndUpdate(id, { $inc: { qty: -quantity } }); // subtract purchased qty
    }
    res.status(200).json({ success: true, message: 'Quantities updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { addService, updateService, getServices, removeService, updateBuyQuantities, updateSaleQuantities }