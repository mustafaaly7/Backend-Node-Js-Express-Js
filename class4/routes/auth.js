import express from 'express'
import userModel from '../model/userModel.js'
import bcrypt from "bcrypt";
import Joi from 'joi';
import 'dotenv/config'

import sendResponse from '../helpers/sendResponse.js';

const  router = express.Router()
// BCRYPT
// we cant save user password exactly the way it is we encrypt the password into hash so it wont be easily accessible 
// for that we use bcrypt 

// JWT 
// and we gonna use jwt (json web token ) it create login token for user and send data along with it 
// like we did in next auth 
// JOI 
// and we're gonna use joi for schema validations 

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6),
    fullname: Joi.string().min(3).max(30).required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})




router.post("/register",async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    
    if(error) return sendResponse(res , 400 , null , error.message)
        console.log("value = > " , value);
    console.log("error = >", error);
        
const user = await userModel.findOne({email : value.email})
if(user) return sendResponse(res , 403 , null , "User already registered with this email ")

    const hashedPassword =await bcrypt.hash(value.password , 12)
value.password = hashedPassword;    


let newUser =  new userModel({...value});
newUser = await newUser.save()

sendResponse(res , 201 , newUser ,false, "User registered Successfully")
// so we created helper to do that same thing as line number 51 
// we created sendResponse on folder named helper 
// res.status(201).send( {data : newUser ,  error: false , msg: "user created successfully "})

})




router.post("/login", (req, res) => { })

// router.post("/reset-password" , (req,res)=>{})
// router.post("/forget-password" , (req,res)=>{})


    export default router