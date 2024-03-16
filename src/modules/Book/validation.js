import joi from "joi";
import { globalValidationFields } from "../../middleWare/validation.js";

export const bookCreationSchema = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  categoryName: joi.string().required(),
  file:joi.object({
    coverImage:joi.array().items(globalValidationFields.file.required()).max(1).min(1),
    pdfFile:joi.array().items(globalValidationFields.pdfFile.required()).max(1).min(1),
}), 
}).required();