import jwt from "jsonwebtoken"
import { asyncHandeller } from "../utils/errorHandeling.js";
import userModel from "../../DB/models/user.model.js";
import { StatusCodes } from "http-status-codes";
import { ErrorClass } from "../utils/errorClass.js";

export const auth = () =>{return asyncHandeller(async(req,res,next) =>{
        const {authorization}=req.headers    
        if(!authorization?.startsWith(process.env.TOKEN_BEARER+ ' ')){
            return next(new ErrorClass("authorization is required or In-Valid Bearer key",StatusCodes.BAD_REQUEST))
        }
        const token = authorization.split(' ')[1];
        if (!token) {
            return next(new ErrorClass("token is required",StatusCodes.BAD_REQUEST))
        }
        const decoded = jwt.verify(token , process.env.TOKEN_SIGNITURE)
        
        if(!decoded?.id){
            return next(new ErrorClass("In-Valid token payload",StatusCodes.BAD_REQUEST))
        }
        const user = await userModel.findById(decoded.id).select('-password')
        if(!user){
            return next(new ErrorClass("Not register account",StatusCodes.BAD_REQUEST))
        }
        req.user=user
        return next()
        })
} 