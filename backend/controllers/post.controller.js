const post = require("../models/post.models");
const {  uploadImage } = require("../utils/cloudinary");

const createPost = async (req,res) =>{
        const User = req.user;
        try {
            const {thought} = req.body;
        
            const fileUrls = [];
            for (const file1 of req.files) {
               const localFilePath = file1.path;
               
               const finalURL = await uploadImage(localFilePath);
                
               fileUrls.push(finalURL);
            }
         
            const newPost = await post.create({
              thought,
              postphoto : fileUrls,
              userid:User._id,
            });
        
            return res.status(200).json(newPost);

        } catch (error) {
            return res.status(500).json({"message":"Internal server error"})
        }
}


const getAllPost = async (req,res) =>{
    const User = req.user;
    try {
        let friendList = User.friends;

        friendList.push(User._id);

        let postList = [];

        for(let i=0;i<friendList.length;i++){
            const p = await post.find({
                userid:friendList[i]
            });
            for(let j=0;j<p.length;j++){
                postList.push(p[j]);
            }  
        }

        postList.sort((a, b) => b.createdAt - a.createdAt);

        return res.status(200).json(postList);
    } catch (error) {
        return res.status(500).json({"message":"Internal server error"})
    }
} 

const removeLikes = async (req,res) =>{
    try {
        const User = req.user;
        const {id} = req.params;
        const currPost = await post.findById(id);

        const likesList = currPost.likes;

        if(!likesList.includes(User._id)) return res.status(400).json({"message":"User has not liked the post!"})

        const newLikesList = likesList.filter(users => {
            return users.toString() !== User._id.toString();
        })

        await post.findByIdAndUpdate(id,{
            likes:newLikesList
        })

        return res.status(200).json({"message":"successfully deleted!"})
    } catch (error) {
        return res.status(500).json({"message":"Internal server error"})
    }
}

const addLikes = async (req,res) => {
    try {
        const User = req.user;
        const {id} = req.params;
        const currPost = await post.findById(id);

        const likesList = currPost.likes;

        if(likesList.includes(User._id)) return res.status(400).json({"message":"User has already liked the post!"})

        likesList.push(User._id);

        await post.findByIdAndUpdate(id,{
            likes:likesList
        })

        return res.status(200).json({"message":"successfully added!"})
    } catch (error) {
        return res.status(500).json({"message":"Internal server error"})
    }
}

const getUserPost = async (req,res) =>{
    try {
        const {id} = req.params;

        const userPost = await post.find({
            userid:id
        })

        userPost.sort((a, b) => b.createdAt - a.createdAt);

        return res.status(200).json(userPost);
    } catch (error) {
        return res.status(500).json({"message":"Internal server error"})
    }
}

const deletePost = async (req,res) =>{
    try {
        const {id} = req.params;
        const currPost = await post.findById(id);
        if(!currPost) return res.status(400).json({"message":"No such post exist"})
        await post.findByIdAndDelete(id);
        return res.status(200).json({"message":"post deleted successfully!"})
    } catch (error) {
        return res.status(500).json({"message":"Internal server error"})
    }
}

module.exports = {createPost,getAllPost,addLikes,removeLikes,getUserPost,deletePost}