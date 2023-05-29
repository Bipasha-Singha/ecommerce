const User = require('../models/usermodel');
const  ErrorHandler/*handleError*/  = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const validator = require('validator');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const axios = require('axios');
const fs = require('fs');

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

const formidable = require('formidable');


exports.RegisterUser = async (req, res) => {
  const form = formidable({ multiples: false });

  form.parse(req, async (error, fields, files) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: 'Failed to parse form data' });
    }

    try {
      const { name, email, password, phone, address, role, answer } = fields;

      // Check if the user already exists in the database
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const { profile } = files;

      if (!profile) {
        return res.status(400).json({ error: 'Profile image is required' });
      }

      const imageData = fs.readFileSync(profile.path);

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      user = new User({
        name,
        email,
        password: hashedPassword,
        profile: {
          data: imageData,
          contentType: profile.type,
        },
        phone: phone || 'N/A',
        address: address || 'N/A',
        role: role || 'user',
        answer: answer
      });

      // Save the user to the database
      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
};

exports.loginuser = async (req, res) => {
  try {
    const form = formidable({ multiples: false });

    form.parse(req, async (error, fields, files) => {
      if (error) {
        console.error(error);
        return res.status(400).json({ error: 'Failed to parse form data' });
      }

      const { email, password } = fields;

      // Check if the email and password are provided
      if (!email || !password) {
        return res.status(400).json({ error: 'Please enter email and password' });
      }

      // Find the user by email
      const user = await User.findOne({ email }).select('+password');
      if (user) {
        // Compare the entered password with the hashed password
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (isPasswordMatched) {
          // Password matched, generate and send the authentication token
          sendToken(user, 200, res);
        } else {
          return res.status(401).json({ error: 'Invalid Email or Password' });
        }
      } else {
        return res.status(401).json({ error: 'Invalid Email or Password' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

//login
/*exports.loginuser = catchAsyncErrors (async (req, res, next)=>{
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

/*});*/
//User logged out
exports.userLogout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
};
exports.forgotpassword=async(req,res)=>{
try{
  const {email, answer, newPassword}= req.body;
  if(!email){
    res.status(400).send({message:"Email is required"});
  }
  if(!answer){
    res.status(400).send({message:"answer is required"});
  } 
  if(!newPassword){
    res.status(400).send({message:"newPasword is required"});
  }
  const user = await User.findOne({email, answer});
  if(!user){
    return res.status(404).send({
      success:false,
      message:"Wrong email or answer"
    })
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(user._id,{password:hashed});
  res.status(200).send({
    success:true,
    message:"Password reset successfully",
  });
}catch(error){
  console.log(error);
  res.status(500).send({
    success:false,
    message:"Something went wrong",
    error
  })
}
}

// Google login callback
exports.googleLogin = async (req, res) => {
  try {
    const { access_token } = req.body;

    // Send the access_token to Google API for verification and retrieval of user details
    const googleApiUrl = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`;
    const response = await axios.get(googleApiUrl);
    const googleUser = {
      name: response.data.name,
      email: response.data.email,
      // Extract other necessary details from the API response if required
    };

    // Save the user to the database
    const user = await User.saveGoogleUser(googleUser);

    // Generate a token for the user
    const token = user.getJWTToken();

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Google login failed' });
  }
};
