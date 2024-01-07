import mongoose from "mongoose";
import validator from "validator"
import IUser from "../dao/user.dao";


const userSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:[true,"Please enter Id"]
    },
    name:{
        type:String,
        required:[true,"Please enter Name"]
    },
    email:{
        type:String,
        unique:[true,"Email already exist"],
        required:[true,"Please enter Email"],
        validate:validator.isEmail
    },
    photo:{
        type:String,
        required:[true,"Please add pPhoto"]
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:[true,"Please enter gGender"]
    },
    dob:{
        type:Date,
        required:[true,"Please enter date of birth"]
    }
},{timestamps:true})


userSchema.virtual("age").get(function(){
    const today = new Date();
    const dob = this.dob;

    let age = today.getFullYear() - dob.getFullYear()

    if(today.getMonth() < dob.getMonth() || today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
        age--;

        return age
})


export const User = mongoose.model<IUser>("User",userSchema)