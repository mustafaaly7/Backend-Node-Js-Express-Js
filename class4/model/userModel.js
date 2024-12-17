import mongoose, { Schema } from "mongoose";



const userSchema = new Schema(
    {
email: {type : String , unique : true , required : true},
fullname :{type:String  },
password:{type:String , required : true},
gender :{type:String ,enum :["male" , "female"] },
city :{type:String },
country :{type:String  },
dob:{type:String  },
isCompleted:{type:Boolean  },

    },
    {
        timestamps : true
    }
)

const userModel = mongoose.model("users", userSchema)
export default userModel
