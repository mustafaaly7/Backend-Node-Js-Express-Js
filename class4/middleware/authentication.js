import express from 'express'
import sendResponse from '../helpers/sendResponse.js'
import jwt from "jsonwebtoken"
import 'dotenv/config'
import userModel from '../model/userModel.js'


export default async function authenticateUser  (req,res,next){
    try {
        
        // the jwt token we send on this api on bearer token of auth 
        // we get it here 
        let token = req.headers.authorization.split(" ")[1] //conver string to array and save 1 index only
        if(!token) return sendResponse(res , 404 , null ,true, "no token found")

            
            // now we gonna verify and decode the token to get data 
            const decodedToken =  jwt.verify(token , process.env.AUTH_SECRET)
            if(decodedToken){
                const user = await userModel.findById(decodedToken._id)
                if(!user) return sendResponse(res , 403 , null ,true, "userNot found")
            req.user = user;
                next()
            }else{
                return sendResponse(res , 500 , null ,true, "something went wrong")

            }
        } catch (error) {
            return sendResponse(res , 500 , null ,true, "something went wrong")
        }
}


