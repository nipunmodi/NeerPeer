const task = require("../models/task.model")

const createTask = async (req,res) =>{
    const {heading,content} = req.body;
    const currUser = req.user;
    try {
        const newTask = await task.create(
            {
               heading,
               content,
               userid: currUser._id,
            }
        )
        if(!newTask){
            return res.status(400).json({"message":"Unknown error occurred!"})
        }
        return res.status(200).json(newTask)
    } catch (error) {
        return res.status(500).json({"message":"Unknown error occurred!"})
    }
}

const getTasks = async (req,res) =>{
      const currUser = req.user;
      try {
         const tasks = await task.find({
            userid:currUser._id,
         }) 
         return res.status(200).json(tasks);
      } catch (error) {
        return res.status(500).json({"message":"Error occurred!",error});
      }
}

const deleteTasks = async (req,res) =>{
    const {taskId} = req.params;
    
    try {
       const Task = await task.findById(taskId);
      
       if(!Task){
         return res.status(400).json({"message":"No such task exist!"})
       }
       await task.findByIdAndDelete(taskId); 
       const allTasks = await task.find({
        userid:req.user._id,
       });
       
       return res.status(200).json(allTasks);
    } catch (error) {
      return res.status(500).json({"message":"Unknown error occurred!"});
    }
}

module.exports = {deleteTasks,createTask,getTasks};