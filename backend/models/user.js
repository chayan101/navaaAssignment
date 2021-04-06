const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const  userSchema = new Schema({
  name:{
    type:String,
    trim: true,
    required: true
  },
  email:{
    type:String,
    trim: true,
    required: true,
    unique: true

  },
  phone:{
    type:Number,
    required: true
  },
  address:{
    type:String,
    trim: true,
    required: true
  },
  password:{
    type: String,
    required:  true
  },
  //salt: String,


});
//
//
// userSchema.method('hashPassword',  async function (plainpassword) {
//   if(!plainpassword) return "";
//   try{
//     const hashedPassword = await bcrypt.hash(plainpassword, this.salt);
//     return hashedPassword;
//   }catch(err){
//     console.log("crypto not working");
//     return "";
//   }
// })
//
// userSchema.method('authenticate', function (plainpassword) {
//   return this.hashPassword(plainpassword) === this.encrypted_password;
// })
//
//
// // userSchema.method = {
// //   authenticate: function(plainpassword){
// //     return this.hashPassword(plainpassword) === this.encrypted_password;
// //   },
// //
// //   hashPassword: function(plainpassword){
// //
// //   }
// // }
//
//
//
// userSchema.virtual("password")
//   .set(async function(password){
//     console.log('working');
//     this._password = password;
//     this.salt  = uuidv4();
//     this.encrypted_password = await this.hashPassword(password);
//   })
//   .get(function(){
//     return this._password;
//   });

const User = mongoose.model("Users", userSchema);

module.exports = User;
