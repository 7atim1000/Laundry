// "type": "module",
const express = require('express');
const connectDB = require('./config/database');
const config = require("./config/config");
const connectCloudinary = require('./config/cloudinary');

const globalErrorHandler = require('./middleware/globalErrorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();
require('colors');

const serviceRoute = require('./routes/serviceRoute');

const PORT = config.port;
connectDB();
connectCloudinary();

// cors policy to unblock response
app.use(cors({
    credentials: true,
    origin: ['https://laundry-sys.onrender.com']
 }))


 //Middleware Parse incoming request in json format and cookie parser for cookies and token 
app.use(express.json()); 
 // to activate middleware (cookieParser)
app.use(cookieParser());

 // global Error Handler 
app.use(globalErrorHandler)

 
// Routes || Api endpoints
app.use('/api/service', serviceRoute) ;

app.use('/api/auth', require('./routes/userRoute'));
app.use('/api/order', require('./routes/orderRoute'));
app.use('/api/transactions', require('./routes/transactionRoute'));

app.use('/api/category', require('./routes/categoryRoute'));
app.use('/api/customer', require('./routes/customerRoute'));
app.use('/api/unit', require('./routes/unitRoute'));

app.use('/api/expenses', require('./routes/expenseRoute'));

// Multer routes FIRST

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`POS server is listening on port ${PORT}` .bgCyan); 
});
