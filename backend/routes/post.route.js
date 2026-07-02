const {Router} = require("express");
const { verifyUser } = require("../middleware/auth.middleware");
const upload = require("../middleware/profilephotoupload.middleware");
const { createPost, getAllPost, removeLikes, addLikes, getUserPost, deletePost } = require("../controllers/post.controller");

const router = Router();

router.post("/uploadPost",verifyUser,upload.array("files",10),createPost);
router.get("/getAllPost",verifyUser,getAllPost)
router.delete("/removeLike/:id",verifyUser,removeLikes)
router.put("/addLike/:id",verifyUser,addLikes)
router.get("/userPost/:id",verifyUser,getUserPost)
router.delete("/deletePost/:id",verifyUser,deletePost)

module.exports = router