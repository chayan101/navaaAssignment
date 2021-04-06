const User = require("../models/user");

exports.details = (req,res)=> {
  User.find({email:req.email} , (err, users)=>{
    if(err){
      res.status(400).json(err);
    }
    res.status(200).json({
      name: users[0].name,
      email: users[0].email,
      phone: users[0].phone,
      address: users[0].address
    });
  })
}
