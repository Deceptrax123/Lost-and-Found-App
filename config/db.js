require("dotenv").config();

//connect mongodb 
module.exports=(mongoose)=>{
    mongoose.connect(process.env.MONGO_CONNECT,{useNewUrlParser:true});
}

