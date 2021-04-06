const express = require("express");
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const {isAuthorised} = require("./functions/functions");
const app = express();



//  port
const port = 8000 || process.env.PORT;

//db connection
mongoose.connect('mongodb://localhost/vanna',
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//template engine
app.set("view engine", 'ejs');

//middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


//routes
app.use("/api/auth" , authRoutes);
app.use("/api/user" ,isAuthorised, userRoutes);


//error handling
//error handling middleware
app.use((err,req,res,next) =>{
  res.status(422).json({
    "error": err.message
  })
});

//listening.........
app.listen(port , ()=>{
  console.log(`listening to port ${port}...`);
})
