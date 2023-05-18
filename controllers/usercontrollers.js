const User = require('../models/usermodel');
const  ErrorHandler/*handleError*/  = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const validator = require('validator');
const bcrypt = require('bcrypt');
//get all users--Admin
exports.getAllUsers = async(req, res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};
//get all users by id--Admin
exports.getUserById = async(req, res)=>{
    try{
        const users = await User.findById(req.params.id);
        if(!users){
            return res.status(404).json({message:"User doesnot exist"});
        }
        else
            res.json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

//register user
exports.registeruser = async (req, res, next) => {
  const { name, email, password, profile, phone, address, role} = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email",
    });
  }

  if (!phone || !address) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid phone number and address",
    });
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Please enter a password",
    });
  }
  /*if (role !== "admin" && role !== "user") {
    return res.status(400).json({
      success: false,
      message: "Invalid role",
    });
  }*/
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profile: {
        public_id: "this is sample id",
        url: "profilepicurl",
      },
      phone,
      address,
      role
    });
    sendToken(user, 201, res);
    /*const token = newUser.getJWTToken();

    res.status(201).json({
      success: true,
      user: newUser,
      token,
    });*/
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    next(error);
  }
};


//login
exports.loginuser = catchAsyncErrors (async (req, res, next)=>{
  const{email, password} = req.body;
  //checking if user has given email and password both
  if(!email || !password){
    return next(new ErrorHandler("Please enter email and passwprd", 400));
  }

  const user = await User.findOne({email}).select("+password");

  if(!user){
    return next(new ErrorHandler("Invalid Email or Password",401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched){
    return next(new ErrorHandler("Invalid Email or Password",401));
  }
  sendToken(user, 201, res);
  /*const token = newUser.getJWTToken();


  res.status(200).json({
      success: true,
      user: newUser,
      token,
  });*/

});
//User logged out
exports.userLogout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
};
