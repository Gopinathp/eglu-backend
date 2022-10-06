const mongoose = require("mongoose");
const uri = "mongodb+srv://harsh:harsh@cluster0.uysw6oq.mongodb.net/myeglu?retryWrites=true&w=majority";

const dbConnection = async () =>{
    try{
  const result = await mongoose.connect(uri);
  if(result) {console.log("database connected successfuly")}
  else {console.log("database is not connected successfuly")}
    }
    catch(error){
        console.log(error);
    }

}

module.exports = dbConnection;