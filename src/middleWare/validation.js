import joi from "joi"
import { Types } from "mongoose"
export const validation = (schema ,considerHeaders = false) =>{
    return (req,res,next) =>{
    let dataFromAllMethods = {...req.body,...req.params ,...req.query}
        if (req.file || req.files) {
            dataFromAllMethods.file = req.file ||req.files
        }
        if (req.headers.authorization && considerHeaders) {
            dataFromAllMethods ={authorization: req.headers.authorization}
        }
        const validationResult = schema.validate(dataFromAllMethods , { abortEarly: true})
            if (validationResult.error) {
                return res.status(400).json({msgError:validationResult.error.message})
            }
            return next()
}
}

const validateObjectId = ( value , helper) =>{
    return Types.ObjectId.isValid(value) ? true : helper.message('In-Valid object-Id from validation')
}

export const globalValidationFields = {
    email:joi.string().email({ minDomainSegments:2 , maxDomainSegments:3 , tlds:{ allow: [ 'com' , 'edu' , 'eg' , 'net'] } }).required().messages({'string.email':'The email address is not valid.'}),
    password:joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required().messages({'string.pattern.base':'Password must include at least 8 characters,one Capital letter and one digit.'}),
    cpassword:joi.string().valid(joi.ref("password")).required().messages({'any.only':'confirm password not match your password.'}),
    userName:joi.string().alphanum().min(3).max(15).required().messages({'string.alphanum':'userName must only contain alpha-numeric characters.'}),
    name:joi.string().min(3).max(20),
    fName:joi.string().min(3).max(15).required(),
    lName:joi.string().min(3).max(15).required(),
    age:joi.number().integer().positive().min(18).max(95),
    phone:joi.string().required(),
    id:joi.string().custom(validateObjectId).required(),
    gender:joi.string().valid("male" , "female"),
    code:joi.string().min(6).max(6).required().messages({'string.min':'Code is not valid.'}),
    file:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required(),
    }),
    pdfFile: joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string(),
        mimetype: joi.string().valid('application/pdf').required().messages({
            'string.valid': '"pdfFile" must be a PDF file'
        }),        
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required(),
    }),
    authorization:joi.string().required(),
    headers:joi.string().required(),
}
