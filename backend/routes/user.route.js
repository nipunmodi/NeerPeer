const {Router} = require("express");
const { createUser, getUser, updateUser, updateProfilePic, getPeers, getPeerDetail, addFriend, removeFriend, getFriendList, getPostUser } = require("../controllers/user.controller");
const  upload  = require("../middleware/profilephotoupload.middleware");
const { verifyUser } = require("../middleware/auth.middleware");

const router = Router();

router.post("/register",createUser);
router.get("/getUser",verifyUser,getUser)
router.put("/updateUser",verifyUser,updateUser)
router.put("/updateProfilePhoto",verifyUser,upload.single("file"),updateProfilePic)
router.get("/getPeer/:firstMatch/:secondMatch",verifyUser,getPeers)
router.get("/getPeerDetails/:id",verifyUser,getPeerDetail)
router.get("/getFriend",verifyUser,getFriendList)
router.put("/addFriends/:id",verifyUser,addFriend)
router.put("/removeFriend/:id",verifyUser,removeFriend)
router.get("/getUser/:id",verifyUser,getPostUser)

module.exports = router