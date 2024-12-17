import express from "express"
import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import 'dotenv/config'
//to import .env files enviroment data on our routes we use dotenv (npm i dotenv) for i.e mongodb uri etc


const app = express()
const PORT = 4000;
//ye poori app mai jo bh ata hai usko json maiconver krdeta hai 
app.use(express.json())
//ab ye detail dedega route knsa hai kitna time liya isko app level pr chlaya hai 
app.use(morgan('tiny'))

const tasks = [{
   task1: "kch bh krlo ",
   id: 1,
   completed: true

}, {
   task2: "kch bh nhi krna ",
   id: 2,
   completed: true

}, {
   task3: "sojao ",
   id: 3,
   completed: false
},]



mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("MONGOOSE connected")
).catch((err)=>{console.log(err);
})


app.get("/singleTask/:id", (req, res) => {
   const task = tasks.find((data) => data.id == req.params.id)
   if (!task) res.send({
      error: true,
      msg: "task not found"
   })
   res.send({
      msg: "Here's your task nigga",
      data: task
   })
})

// 1.APP LEVEL MIDDLEWARE 
function middleware(req, res, next) {
   //now we can edit req and res with middleware watch this 
   req.requestBy = "Mustafa Ali"

   console.log("middleware =>", Date.now())
   
   next()
}

// app.use("/user", userRoutes)
app.use("/auth", authRoutes)

//user routes
app.use("/user" , userRoutes )


//QUERY 
app.get("/", (req, res) => {
   const { completed } = req.query
   let filter = tasks
   if (completed) {
      filter = tasks.filter((data) => completed == 1 ? data.completed == true : data.completed == false)
   }

   res.send({
      data: filter,
      msg: "iscompleted ye rhy "
   })

})





app.post("/", (req, res) => {
   console.log("req.body=>", req.body);

   res.send("post req Called")
})


app.put("/", (req, res) => {
   res.send("Put req worked")
})



app.delete("/", (req, res) => {
   res.send("delete worked safely ")
})



app.listen(PORT, () => {
   console.log("Working From Port ", PORT);

})