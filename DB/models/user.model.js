import mongoose, { Schema, Types, model } from "mongoose";
const userSchema = new Schema({
    userName:{
        type:String,
        required:[true , 'userName is required'],
        min:[3,'minimum lenght is 3 char'],
        max:[15,'maximum lenght is 10 char'],
    },
    email:{
        type:String,
        required:[true , 'email is required'],
        unique:[true , 'email must be unique'],
        lowercase:true,
    },
    password:{
        type:String,
        required:[true , 'password is required']
    },
}, 
{
    timestamps:true,
}
)



const userModel = mongoose.models.User|| model("User",userSchema)


export default userModel