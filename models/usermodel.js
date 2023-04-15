const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
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
    profile:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type: String,
        default: "user",
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
module.exports = mongoose.model('user', userSchema);