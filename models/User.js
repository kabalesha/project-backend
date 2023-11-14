import * as yup from "yup";
import { Schema, model } from "mongoose";

const passwordValidationRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schemaUser = new Schema(
  {
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

    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const UserNew = model("user", schemaUser);

const userSingUpSchema = yup.object().shape({
  email: yup.string().email(emailValidationRegex).required("Email is required"),
  password: yup.string().min(8).max(48).required("Password is required"),
  repeatPassword: yup
    .string()
    .min(8)
    .max(48)
    .required("RepeatPassword is required"),
});

const userSingInSchema = yup.object().shape({
  email: yup.string().email(emailValidationRegex).required("Email is required"),
  password: yup.string().min(8).max(48).required("Password is required"),
});

const user = {
  UserNew,
  userSingUpSchema,
  userSingInSchema,
};

export default user;
