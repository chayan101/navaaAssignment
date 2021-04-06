
const User = require("../models/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {hashPassword } = require("../functions/functions");
const { check, validationResult } = require("express-validator");

exports.logout = (req, res)=>{
  res.clearCookie('user');
  res.status(200).send('user logged out!!!');
};


exports.signup = async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  else if(req.body.password != req.body.confirmPassword){
    res.status(400).send('passwords do not match');
  }
  try{
     req.body.password = await hashPassword(req.body.password);
  const user = new User(req.body);
  user.save((err, user)=>{
    if(err){
      res.status(400).json(err);
    }
    res.status(200).render('login');
  });
}catch{
  res.send('not able to register user');
}

};


exports.login =   (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.find({email:req.body.email}).then(async ( user)=>{
   if(!user){
     res.send('invalid email!');
   }

   try{
     console.log(user);
     const result = await bcrypt.compare(req.body.password, user[0].password);

      if (result){
        var token = jwt.sign({ email: req.body.email }, process.env.SECRET);

        res.cookie('user', token);
        res.status(200).render('home');




     } else {

        res.json({success: false, message: 'passwords do not match'});
     }


}catch(error){
   console.log(error);
   res.send('err');
}
}).catch(next);

};
