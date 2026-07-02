const roomate = require("../models/roomate.model");
const { findById } = require("../models/user.models");
const { uploadImage } = require("../utils/cloudinary");

const createRoom = async (req,res) =>{
        const User = req.user;
        try {
            const { location, features, numberofroomaterequired,phonenumber } = req.body;
            
        
            const fileUrls = [];
            for (const file1 of req.files) {
               const localFilePath = file1.path;
               
               const finalURL = await uploadImage(localFilePath);
                
               fileUrls.push(finalURL);
            }
         
            const newRoom = await roomate.create({
              location,
              features,
              numberofroomaterequired,
              roomphotos : fileUrls,
              userid:User._id,
              phonenumber,
            });
        
            return res.status(200).json(newRoom);

        } catch (error) {
            return res.status(500).json({"message":"Internal server error"})
        }
}

const getAllRooms = async (req,res) =>{
   const currUser = req.user; 
   const { firstMatch,secondMatch} = req.params;
   try {
      const AllRooms = await roomate.find().populate({path:"userid",select:"name email yearofpassout interests -_id"});

      let reqRooms = [];
     
      if(firstMatch === "All" && secondMatch === "All"){
         reqRooms = AllRooms.filter((rooms)=>{
            return (
               (rooms.userid.yearofpassout === currUser.yearofpassout)
            )
       })
      }
      else if(firstMatch !== "All" && secondMatch === "All"){
         reqRooms = AllRooms.filter((rooms)=>{
            return (
               ((rooms.userid.yearofpassout === currUser.yearofpassout)&&(rooms.userid.interests[0] === firstMatch))
            )
       })
      }
      else if(firstMatch === "All" && secondMatch !== "All"){
         reqRooms = AllRooms.filter((rooms)=>{
            return (
               (rooms.userid.yearofpassout === currUser.yearofpassout)&&(rooms.userid.interests[1] === secondMatch)
            )
       })
      }
      else{
         reqRooms = AllRooms.filter((rooms)=>{
            return (
               (rooms.userid.yearofpassout === currUser.yearofpassout)&&((rooms.userid.interests[0] === firstMatch)||(rooms.userid.interests[1] === secondMatch))
            )
       })
      }
      

      return res.status(200).json(reqRooms);
       
   } catch (error) {
      return res.status(500).json({"Message":"Internal Server Error"})
   }
}


const getRoom = async (req,res) =>{
      try {
         const {id} = req.params;
         
         const Room = await roomate.findById(id).populate({path:"userid",select:"name interests"});

          
         if(!Room){
            return res.status(400).json({"message":"No such room found!"});
         }

         return res.status(200).json(Room);

      } catch (error) {
         return res.status(500).json({"message":"An unknown error occurred!"});
      }
}


const deleteRoom = async (req,res) =>{
   const {id} = req.params;
   const currUser = req.user;
   try {
      const room = await roomate.findById(id);
      
      if(!room){
         return res.status(400).json({"message":"Such room dont exist!"})
      }
      if(!room.userid.equals(currUser._id)){
         return res.status(400).json({"message":"User not authenticated!"})
      }
      await roomate.findByIdAndDelete(id);
      return res.status(200).json({"message":"deleted successfully!"})
   } catch (error) {
      return res.status(500).json({"message":"Internal server error!"})
   }
}


const getMyRoom = async (req,res) =>{
     const currUser = req.user;
     try {
         const myrooms = await roomate.find({
            userid:currUser._id,
         }).populate({path:"userid",select:"name email yearofpassout interests -_id"})
         return res.status(200).json(myrooms);
     } catch (error) {
         return res.status(500).json({"message":"Internal server error!"});
     }
}

module.exports = {createRoom,getAllRooms,getRoom,deleteRoom,getMyRoom};