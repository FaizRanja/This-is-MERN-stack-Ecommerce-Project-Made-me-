const express = require('express');
const ErrorHandler=require("./middleware/error")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload')
const dotenv = require('dotenv');
const path=require("path")

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ['http://localhost:3000'],
        credentials: true
        
    }
));

// configure dotenv
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path: 'backend/config/config.env'});

}

app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
app.use(fileUpload())
// route imports
const product = require('./routes/productRoutes');
const user=require("./routes/UserRoutes")
const Order=require("./routes/orderRoutes")
const payment=require("./routes/PaymentRoute")

app.use('/api/v1', product);
app.use("/api/v1",Order)
app.use("/api/v1",user)
app.use("/api/v1",payment)

// Creating Fornat 
app.use(express.static(path.join(__dirname, "../Fornant/build")))

app.get("*" , (req,res)=>{
    res.sendFile(path.resolve(__dirname,"../Fornant/build/index.html"))
})


// Middle ware
app.use(ErrorHandler)


module.exports = app;