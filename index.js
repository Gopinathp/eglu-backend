const express = require("express");
const cors = require("cors");
const dbConnection = require("./db");
dbConnection();

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

//Routes 
app.use('/api/product',require('./routes/product'));


app.listen(port, () =>{
    console.log(`server is started on the port no. ${port}`);
})