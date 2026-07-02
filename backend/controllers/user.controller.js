const user = require("../models/user.models");
const { uploadImage } = require("../utils/cloudinary");

const createUser = async (req,res) =>{
     const {name,email,branch,yearofpassout} = req.body;
     
     try {
        const newUser = await user.create({
            name,
            email,
            branch,
            yearofpassout,
        })
        return res.status(200).json({"message":"Registered successfully!",newUser})
     } catch (error) {
        return res.status(500).json({"message":"Registeration failed!",error})
     }
}

const getUser =  (req,res) =>{
    const currUser = req.user;
    if(currUser){
       return res.status(200).json(currUser);
    }
    return res.status(500).json({"message":"Internal server error!"});
}

const updateUser = async (req,res) =>{
   try {
      const userId = req.user._id; 
      const { name, branch, interests,bio } = req.body; 

      if (!name || !branch || !interests) {
          return res.status(400).json({ message: "Enter all the fields" });
      }

      let updateFields = {};
       updateFields.name = name;
       updateFields.branch = branch;
       updateFields.interests = interests;
       updateFields.bio = bio;

      
      const updatedUser = await user.findByIdAndUpdate(
          userId,
          { $set: updateFields }, 
          { new: true, runValidators: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found." });
      }

      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(500).json({ message: "Internal Server error." });
  }

}

const updateProfilePic = async (req,res) =>{
    const userId = req.user._id;
    try {        
        if(!(req.file)){
            return res.status(400).json({"message":"No file uploaded!"})
        }
        const localPath = req.file.path;

        const finalURL = await uploadImage(localPath);
      

        let updatedFields = {};
        updatedFields.profilepic = finalURL;
  
    
       
       const updatedUser = await user.findByIdAndUpdate(
           userId,
           { $set: updatedFields }, 
           { new: true, runValidators: true }
       );
 
       if (!updatedUser) {
           return res.status(404).json({ message: "User not found." });
       }
       
        return res.status(200).json(updatedUser)
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server error." });
    }
}

const getPeers = async (req,res) =>{
    const { firstMatch,secondMatch} = req.params;
    
    try {
        const AllPeers = await user.find({yearofpassout:req.user.yearofpassout});

        let reqPeers = AllPeers;
        
       
        if(firstMatch !== "All" && secondMatch === "All"){
           reqPeers = AllPeers.filter((peer)=>{
              return (
                 (peer.interests[0] === firstMatch)
              )
         })
        }
        else if(firstMatch === "All" && secondMatch !== "All"){
            reqPeers = AllPeers.filter((peer)=>{
                return (
                   (peer.interests[1] === secondMatch)
                )
           })
        }
        else if(firstMatch !== "All" && secondMatch !== "All"){
            reqPeers = AllPeers.filter((peer)=>{
                return (
                   ((peer.interests[0] === firstMatch) || (peer.interests[1] === secondMatch))
                )
           })
        }
        
        return res.status(200).json(reqPeers);
    } catch (error) {
        res.status(500).json({ message: "Internal Server error." });
    }
}

const getPeerDetail = async (req,res) =>{
    const {id} = req.params;
    try {
        const peer = await user.findById(id);
        if(!peer) return res.status(400).json({"message":"No such peer found"});

        return res.status(200).json(peer);
    } catch (error) {
        res.status(500).json({ message: "Internal Server error." });
    }
}

const addFriend = async (req,res) =>{
    const {id} = req.params;
    const User = req.user;
    try {
        let friendList = User.friends;
        
        friendList.push(id);
        const updatedUser = await user.findByIdAndUpdate(User._id,{friends:friendList});

        let peer = await user.findById(id);
        let peerfriendList = peer.friends;
        peerfriendList.push(User._id);
        await user.findByIdAndUpdate(id,{friends:peerfriendList});

        return res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Internal Server error." });
    }
}

const removeFriend = async (req,res) => {
    const {id} = req.params;
    const User = req.user;
    try {
        let friendList = User.friends;
        if(!friendList.includes(id)) return res.status(400).json({"message":"No such friend present!"})
        let newfriendList = friendList.filter((friend) => { 
           return String(friend) !== id
        });
        
        const updatedUser = await user.findByIdAndUpdate(User._id,{friends:newfriendList});

        let peer = await user.findById(id);
        let peerfriendlist = peer.friends;
        if(!peerfriendlist.includes(User._id)) return res.status(400).json({"message":"No such friend present!"})
        let newpeerfriendList = peerfriendlist.filter((friend) => {
          return String(friend) !== String(User._id)
        });
        await user.findByIdAndUpdate(id,{friends:newpeerfriendList});

        return res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Internal Server error." });
    }
}

const getFriendList = async (req,res) =>{
    const User = req.user;
    try {
        let friendList = [];
        for(let i=0;i<User.friends.length;i++){
            let id = User.friends[i];
            
            let friend = await user.findById(id);
            if(!friend) return res.status(400).json({"message":"No such friend"})
            friendList.push(friend);
        }

        return res.status(200).json(friendList);
    } catch (error) {
        res.status(500).json({ message: "Internal Server error." });
    }
}

const getPostUser = async (req,res) =>{
    const {id} = req.params;
    try {
        const postUser = await user.findById(id);
        if(!postUser) return res.status(400).json({"message":"No such user"});

        return res.status(200).json(postUser);

    } catch (error) {
        res.status(500).json({ message: "Internal Server error." });
    }
}

module.exports = {createUser,getUser,updateUser,updateProfilePic,getPeers,getPeerDetail,addFriend,removeFriend,getFriendList,getPostUser}