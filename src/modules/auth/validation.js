import joi from "joi";
import { globalValidationFields } from "../../middleWare/validation.js";
export const signup = joi
  .object({
    userName: globalValidationFields.userName,
    email: globalValidationFields.email,
    password: joi.string().min(6),
  })
  .required();

export const signIn = joi
  .object({
    email: globalValidationFields.email,
    password: globalValidationFields.password,
  })
  .required();