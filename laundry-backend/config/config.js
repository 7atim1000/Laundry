require('dotenv').config();

const config = Object.freeze({
    
    port: process.env.PORT || 8080,
    databaseURI: process.env.MONGODB_URI || "mongodb://localhost/Laundry",
    nodeEnv : process.env.NODE_ENV || "development",

    accessTokenSecret : process.env.JWT_SECRET,

});

module.exports = config 