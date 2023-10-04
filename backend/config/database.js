const mongoose = require("mongoose");


const connectdatabase=()=>{
    mongoose.connect(process.env.DB_URI ,{useNEWUrlParser:true,useUnifiedTopology:true}
        ).then((data)=>{console.log(`mongodb connect with server:${data.connection.host}`)})
        
    }

    module.exports=connectdatabase 




