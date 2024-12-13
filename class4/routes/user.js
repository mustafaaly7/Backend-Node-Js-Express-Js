// this page will entire handle all the apis and work needed to be done with user  routes and dynamic url etc
// same goes with courses sections and everything courses routes teacher routes etc alag alag file bnegi hehe
// woh jb bh /user bh aiga tou woh ye file mai aiga 
// woh jb / course ki file mai jaiga tb yeurl call hoga courses routes 
// seperate files makes it easier to understand  
// agr sbko aik hi page pr bnadeingy tou issue hoga debugging and handling mai 

import express from 'express'

const router = express.Router()

const users = [
    {
        fullname: "Mustafa",
        email: "mustafaaaly27@gmail.com",
        id : 1,
    },
    {
        fullname: "ahmed",
        email: "ahmedaaly27@gmail.com"
        ,id :2
    }
]

// get req to get all the users 
router.get("/", (req, res) => {
    res.status(200).json(
        {
            error: false,
            data: users,
            msg: "user's fetched succesfully",
        }
    )
})



// post req to post a user 
router.post("/" , (req,res)=>{
const{fullname , email} = req.body
console.log("fullname =>" ,fullname);
console.log("email =>" ,email);
users.push({ fullname, email, id: users.length + 1 })
    res.status(201).json(
        {
            error: false,
            data: users,
            msg: "user created succesfully",
        }
    )

})




// dynamic get req of get to get dynamic id with param :id
// dynamic route of the url without it api wont be completed 
router.get("/:id" , (req,res)=>{
    const singleUser = users.find((data)=>data.id == req.params.id) // means find in users array in line 8 and if they match with the one with in request url params save it to user variable 
    if(!singleUser){
        res.status(404).json({
            error:true,
            msg: "user not found ",
            data : null
        })
    }
    res.status(200).json({
        error:false,
        msg: "user found ",
        data : singleUser
    })
})


export default router
