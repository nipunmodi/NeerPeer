const mongoose= require("mongoose")

const TaskSchema = new mongoose.Schema({
    heading : {
        type: String,
        required:true,
    },
    content : {
        type:String,
        required:true,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
})

module.exports = mongoose.model("Task",TaskSchema);