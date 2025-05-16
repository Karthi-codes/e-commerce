// define with a variable of the method
require("dotenv").config();
const a= require("express");
const mongoose = require("mongoose");

const path=require("path");

// mentioning the function with variable
const app= a();

// it is used to check the directory path of the file and also it cannot change the path of the file when we gave static 
app.use(a.static(__dirname));

// it was used to make a structure of the pgm ku using the binary code to normal code
app.use(a.urlencoded({extended:true}));

// it is used the connect the backend 
mongoose.connect(`${process.env.MONGO_URI}`);

const check=mongoose.connection;

// it is used to check the data is connected or not
check.once('open',function(req,res){
    console.log("MDB- connected");
})

// it is used to define the schema of the connection
const db_type= new mongoose.Schema({ 
    name:String,
    email:String,
    password:String,
    mobile:String
})

//it was used to store the data in the collection//datatype  
const collection=mongoose.model("Coll_name",db_type);
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"register.html"));
})

// when i press the submit button the data will store in the database by using the collection name
app.post("/post",async function(req,res) {
    const{name,email,password,mobile}=req.body;
    
    const data=new collection({
        name,email,password,mobile
    })
    await data.save();

// after the data is stored it will display the data in the console and the next page will be displayed
    console.log(data);
    res.sendFile(path.join(__dirname,"sign_in.html"))
});

// it will display the login page path 
app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname,"sign_in.html"))// this line is used to reterive the direct login file 
});

// post method is used to check the details that i saved in the login page that will check the detail in sign.in page
app.post('/webpage',async function(req,res) {
    const{email,password}=req.body;

    const chk=await collection.findOne({email,password});

    if(chk){
        res.sendFile(path.join(__dirname,"Front-End.html"))
    }
    else{
        res.send("Invalid Email or Password");
    }
    
}) 

// port number is used to display the content in the browser
app.listen(2004,()=>{
    console.log("http://localhost:2004");
})