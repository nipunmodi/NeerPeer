const {Router} = require("express");
const { verifyUser } = require("../middleware/auth.middleware");
const { createRoom, getAllRooms, getRoom, deleteRoom, getMyRoom } = require("../controllers/roomate.controller");
const upload = require("../middleware/profilephotoupload.middleware");

const router = Router();

router.post("/create",verifyUser,upload.array("files",10),createRoom);
router.get("/getAllRooms/:firstMatch/:secondMatch",verifyUser,getAllRooms);
router.get("/getRoom/:id",verifyUser,getRoom);
router.delete("/deleteRoom/:id",verifyUser,deleteRoom)
router.get("/getMyRoom",verifyUser,getMyRoom);

module.exports = router