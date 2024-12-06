import express from "express"
import cors from "cors"


const app =express()
const port =3000;
app.use(cors()) // for public ipto not get disturbed by it  
 
app.use(express.json())  // api ko json mai cnvert krne ky liye readable bnaiga body ko 
 
app.listen(port , ()=>{ // ab ye chlta rahega 
    console.log("app is running port " ,port)
})

