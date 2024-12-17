import express from 'express'
import sendResponse from '../helpers/sendResponse.js'
import jwt from "jsonwebtoken"
import 'dotenv/config'
import authenticateUser from '../middleware/authentication.js'
import userModel from '../model/userModel.js'

const router = express.Router()

router.put("/" , authenticateUser,async (req,res)=>{
    try {
        
        const{city , country} = req.body
        const singleUser = await userModel.findOneAndUpdate(req.user._id , {city ,  country} ).exec()
        
        sendResponse(res , 200 , singleUser , false , "user Updated successfully")
        
    } catch (error) {
        sendResponse(res , 404 ,  true, "something went wrong")
        
    }
    })



export default router