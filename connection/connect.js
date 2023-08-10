const mongoose = require('mongoose');

const connection = async () =>{
    try{

        const res = await mongoose.connect('mongodb+srv://admin:admin@onlineshopping.z6bz2.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        if(res){
            console.log("sucess in connection to db");
        }
    }
    catch(err){
        console.log(err);
    }
}
module.exports = connection;