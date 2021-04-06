const express = require("express");
const {logout, signup, login} = require("../controllers/auth");
const { body, validationResult } = require('express-validator');

const router = express.Router();
router.get("/login", (req,res)=>{
  res.render('login')
})

router.get("/register", (req,res)=>{
  res.render('register')
})
router.get("/logout" ,logout);

router.post("/signup" ,
 body('email').isEmail(),
 body('password').isLength({ min: 5 }),
 body('name').isLength({ min: 2 }),
 body('address').isLength({ min: 2 }),
 body('phone').isLength({ min: 10 })
 , signup);

router.post("/login" ,
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  login);


module.exports = router;
