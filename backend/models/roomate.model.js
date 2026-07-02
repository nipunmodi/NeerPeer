const mongoose= require("mongoose")

const RoomateSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    location:{
        type:String,
        required:true,
    },
    features:{
        type:String,
        required:true,
    },
    numberofroomaterequired:{
        type:Number,
        required:true,
        default:1,
    },
    roomphotos:[String],
    phonenumber:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("Roomate",RoomateSchema);