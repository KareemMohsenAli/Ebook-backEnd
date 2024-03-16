import { Router } from "express";
import * as authController from "./controller/Book.js";
import { validation } from "../../middleWare/validation.js";
import * as validatores from "./validation.js";
import { asyncHandeller } from "../../utils/errorHandeling.js";
import { auth } from "../../middleWare/authontication.js";
import { fileUpload, fileValidation } from "../../utils/multer.cloud.js";

const router = Router();
router.post(
  `/create`,
  auth(),
  fileUpload([...fileValidation.image, ...fileValidation.file]).fields([
    { name: "coverImage", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  validation(validatores.bookCreationSchema),
  asyncHandeller(authController.createBook)
);

router.get('/', auth(), asyncHandeller(authController.getBooks));

export default router;
