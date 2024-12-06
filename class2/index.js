 import express from "express"

 const app = express()
 const PORT = 4000;
 app.get("/" , (req , res)=>{
    console.log("req",req);
    res.send("HELLO WORLD First api Response.send")
    //res bhejna zaroori hai 


    
 })


 app.listen(PORT ,()=>{
    console.log("Working From Port " , PORT);
    
 })
