require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./db/conn")
const userroute = require("./routes/user.route")
const usertaskroute = require("./routes/task.route")
const roomateroute = require("./routes/roomate.route")
const postroute = require("./routes/post.route")



app.use(express.json())

app.use(cors({
  origin: "*", 
  methods: "*",         
  allowedHeaders: "*", 
  credentials: true                            
}));

app.use(cookieParser())
app.use('/uploads',express.static('uploads'))

connectDB();

app.use("/api/v1/2024/user",userroute)
app.use("/api/v1/2024/task",usertaskroute)
app.use("/api/v1/2024/roomate",roomateroute)
app.use("/api/v1/2024/post",postroute)

console.log(process.env.PORT);


app.listen(process.env.PORT,()=>{
    console.log("Server running on PORT ",process.env.PORT);
})
