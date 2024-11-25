const app =require('./app');
const connectdatabase =require("./config/database")
const  cloudinary=require ('cloudinary')  

const dotenv=require('dotenv')
// Handle Uncaught Exception


process.on('uncaughtException',err=>{
    console.log(`ERROR:${err.message}`);
    console.log('Shutting down the server due to Uncaught Exception');
    process.exit(1)
})


// configure dotenv
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path: 'backend/config/config.env'});

}

// connect to database

connectdatabase()




cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})



const server=app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port http://localhost ${process.env.PORT}`);
});

// invaild Promise Rejection

process.on('unhandledRejection',err=>{
    console.log(`ERROR:${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(()=>{
        process.exit(1)
    })
})


