const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    thought: {
        type: String,
    },
    postphoto: [String],
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
}, { timestamps: true })

module.exports = mongoose.model("Post", PostSchema);