import express from 'express'
import userModel from '../model/userModel.js'
import bcrypt from "bcrypt";
import Joi from 'joi';
import 'dotenv/config'
import jwt from "jsonwebtoken"
import sendResponse from '../helpers/sendResponse.js';

const router = express.Router()
// BCRYPT
// we cant save user password exactly the way it is we encrypt the password into hash so it wont be easily accessible 
// for that we use bcrypt 

// JWT 
// and we gonna use jwt (json web token ) it create login token for user and send data along with it 
// like we did in next auth 
// JOI 
// and we're gonna use joi for schema validations 


//VALIDATION SCHEMA FOR REGISTRATION
const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    fullname: Joi.string().min(3).max(30).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
//VALIDATION SCHEMA FOR LOGIN

const loginSchema = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required()
})


router.post("/register", async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);

    if (error) return sendResponse(res, 400, null, error.message)
    console.log("value = > ", value);
    console.log("error = >", error);

    const user = await userModel.findOne({ email: value.email })
    if (user) return sendResponse(res, 403, null, "User already registered with this email ")

    const hashedPassword = await bcrypt.hash(value.password, 12)
    value.password = hashedPassword;


    let newUser = new userModel({ ...value });
    newUser = await newUser.save()

    sendResponse(res, 201, newUser, false, "User registered Successfully")
    // so we created helper to do that same thing as line number 51 
    // we created sendResponse on folder named helper 
    // res.status(201).send( {data : newUser ,  error: false , msg: "user created successfully "})

})

//login

router.post("/login", async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);

    if (error) return sendResponse(res, 400, null, error.message)
    console.log("value = > ", value);

    const userLogin = await userModel.findOne({ email: value.email }).lean()  // when we get the object to send thru jwt we use .lean() it converts it into javascript object
    if (!userLogin) return sendResponse(res, 403, null, "invalid email")

    const isValidpass = await bcrypt.compare(value.password, userLogin.password)
    if (!isValidpass) return sendResponse(res, 404, null, "Invalid Credentials")

        //sending token along with userLogin object that we found and we send auth secret aswell
        var token = jwt.sign(userLogin, process.env.AUTH_SECRET);

        //now we gonna send token and user login along with it 
        sendResponse(res, 201, {userLogin,token}, false, "User Logged In Successfully")

    // to tell user its okay we use jwt token 

})




// router.post("/reset-password" , (req,res)=>{})
// router.post("/forget-password" , (req,res)=>{})


export default router