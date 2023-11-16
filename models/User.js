import * as yup from "yup";
import { Schema, model } from "mongoose";
import {
  handleMongooseError,
  runValidatorsAtUpdate,
} from "../helpers/index.js";

const passwordValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schemaUser = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },

    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

schemaUser.post("save", handleMongooseError);
schemaUser.pre("findOneAndUpdate", runValidatorsAtUpdate);
schemaUser.post("findOneAndUpdate", handleMongooseError);

const UserNew = model("user", schemaUser);

const userSignUpSchema = yup.object().shape({
  email: yup.string().email(emailValidationRegex).required("Email is required"),
  password: yup
    .string()
    .matches(passwordValidationRegex)
    .min(8)
    .max(48)
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .min(8)
    .max(48)
    .required("RepeatPassword is required"),
});

const userSignInSchema = yup.object().shape({
  email: yup.string().email(emailValidationRegex).required("Email is required"),
  password: yup.string().min(8).max(48).required("Password is required"),
});

const user = {
  UserNew,
  userSignUpSchema,
  userSignInSchema,
};

export default user;
