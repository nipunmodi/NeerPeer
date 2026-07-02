const mongoose= require("mongoose")

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true,
    },
    email : {
        type:String,
        required:true,
        unique:true,
    },
    profilepic : {
        type:String,
    },
    bio : {
        type:String,
    },
    interests : [String],
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    branch:{
        type:String,
        required:true,
    },
    yearofpassout:{
        type:Number,
        required:true,
    }
})

module.exports = mongoose.model("User",UserSchema);