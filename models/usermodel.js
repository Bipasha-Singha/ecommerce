const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');

const userSchema = new mongoose.Schema({
    profile:{
        data:Buffer,
        contentType:String
    },
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        Validate:[validator.isEmail,'Please enter a valid email']
    },
    password:{
        type: String,
        required:true,
        select: false,
    },
    /*profile:{
        public_id:{
            type: String,
            //required: true
        },
        url:{
            type: String,
            //required: true
        }
    },*/
    phone:{
        type:String,
        required:true,
        default:"N/A",
    },
    address:{
        type:String,
       required:true,
       default:"N/A",
    },
    role:{
        type: String,
        default: "user",
    },
    answer:{
        type:String,
        //required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    /*isadmin:{
        type:Boolean,
        required: true,
        default: false
    }*/
}/*,{timestamps:true}*/);
userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})
//JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};
//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.statics.saveGoogleUser = async function (googleUser) {
    try {
      const User = mongoose.model('user'); // Obtain the model using the mongoose.model method
  
      // Check if the user already exists in the database
      let user = await User.findOne({ email: googleUser.email });
  
      if (user) {
        // User already exists, update any necessary details
        user.name = googleUser.name;
        user.email = googleUser.email;
        user.password = googleUser.password || randomstring.generate();
        user.phone = googleUser.phone || 'N/A';
        user.address = googleUser.address || 'N/A';
        user.answer = 'prashant';
        user.role = 'user';
        // Update other user details if required
  
        await user.save();
      } else {
        // User doesn't exist, create a new user
        const password = googleUser.password || randomstring.generate(); // Generate a random password if not provided
        const hashedPassword = await bcrypt.hash(password, 10);
  
        user = new User({
          name: googleUser.name,
          email: googleUser.email,
          password: hashedPassword,
          profile: {
            public_id: 'google-public-id', // Provide a default value for public_id
            url: 'google-profile-url', // Provide a default value for url
          },
          phone: googleUser.phone || 'N/A', // Use a default value if phone is not provided
          address: googleUser.address || 'N/A', // Use a default value if address is not provided
          answer: 'prashant',
          role: 'user',
        });
  
        await user.save();
      }
  
      return user;
    } catch (error) {
      throw error;
    }
  };
  
module.exports = mongoose.model('user', userSchema);