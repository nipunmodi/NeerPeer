const {Router} = require("express");
const { verifyUser } = require("../middleware/auth.middleware");
const { createTask, getTasks, deleteTasks } = require("../controllers/task.controller");

const router = Router();

router.post("/createTask",verifyUser,createTask);
router.get("/getTasks",verifyUser,getTasks)
router.delete("/deleteTask/:taskId",verifyUser,deleteTasks);

module.exports = router