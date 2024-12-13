import express from "express"
import morgan from "morgan";
import userRoutes from "./routes/user.js"

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

// middleware
// what is middleware ?
// it has access to req res and to edit delete the req and end it  and to hold the cycle 
// middleware wont work without next  to execute the cycle further  we use next to move it forward 
// we can execute anycode in middleware
// call the next middleware function in stack 
// end the req response cycle 
// it works as a security guard that lets u in the particular thing 
// node js is single thread 
// better than multithread
// with signle thread u can take big task and do it in back while completing the short one first while in multi thread whether the task is big or not the other task has to wait for it to finish first in order for there turn even tho multi thread has more counter and things but single thread is more efficient 


//TYPE OF MIDDLE WARE 
// 1. App level middleware(means hr jagah use hoga pori app mai )
// 2. router level (means routing mai hoga get post mai jo route hote unme )
// 3. Error handling ( means error handle krne mai )
// 4.Built in (builtin middleware )
// 5. Third party middleware (thirdparty site or app )



//so if i search /singleTask it wont show anything cuz url wont be completed without dynamic params 
//  this is PARAMS 
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



// 1.APP LEVEL MIDDLEWARE 
function middleware(req, res, next) {
   //now we can edit req and res with middleware watch this 
   req.requestBy = "Mustafa Ali"

   console.log("middleware =>", Date.now())
   //now imma end the res and req cycle by sending res here directly 

   // res.status(500).send("system mai issue hogya middle ware ending the cycle ") // so it wont run the the api's res now 

   //now if we put middleware in the middle of get route and req res it will become routing level middlware and this middleware will work only there

   // if we wont use next() itll not stop it'll keep loading Next is important 
   // woh agay nh janay dega wrna 
   next()
}

app.use("/user", userRoutes)
//means poori app mai ye middleware use kro 
// app.use(middleware)




// app.get("/", middleware, (req, res) => {
//    //since we added middleware only here and ended the cycle in midleware so it wont work on get req only now 



//    //middleware added that in request
//    console.log("req.request by", req.requestBy);

//    res.status(200).send(tasks)

//    //res bhejna zaroori hai 



// })

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