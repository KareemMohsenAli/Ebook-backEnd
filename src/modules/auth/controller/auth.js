import { StatusCodes } from "http-status-codes";
import sendEmail from "../../../utils/email.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { compare, hash } from "../../../utils/hashAndCompare.js";
import htmlContent from "../../../utils/html.js";
import userModel from "../../../../DB/models/user.model.js";
import { nanoid } from "nanoid";
import { generateToken } from "../../../utils/generateAndVerifiyToken.js";
import cloudinary from "../../../utils/cloudinary.js";
// sign up
export const signUp = async (req, res, next) => {
  const checkEmail = await userModel.findOne({ email: req.body.email });
  if (checkEmail) {
    return next(
      new ErrorClass(
        `This Email ${req.body.email} is already exist`,
        StatusCodes.BAD_REQUEST
      )
    );
  }
  req.body.password = hash(req.body.password);
  await userModel.create(req.body);
  return res.status(200).json({ message: "User is registered successfully!" });
};

//signIn
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).lean();
  if (!user) {
    return next(
      new ErrorClass("invalid login data", StatusCodes.NOT_ACCEPTABLE)
    );
  }

  const matchPass =  compare(password, user.password);
  if (!matchPass) {
    return next(
      new ErrorClass("invalid login data", StatusCodes.NOT_ACCEPTABLE)
    );
  }
  delete user.password;
  const token = generateToken({ payload: { id: user._id, email: user.email } });
  return res
    .status(StatusCodes.ACCEPTED)
    .json({ message: "done", user, token });
};
