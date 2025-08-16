const mongoose = require('mongoose');
const config = require('./config');
require('colors');



const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.databaseURI);
        console.log(`MongoDB Connected: ${conn.connection.host}` .bgMagenta);
    } catch (error) {
       console.log(`Error: ${error.message}`.bgRed)
       process.exit();
    }
}


module.exports = connectDB;


