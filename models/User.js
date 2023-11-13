import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from '../helpers/handleMongooseError.js';
import runValidatorsAtUpdate from '../helpers/runValidatorsAtUpdate.js';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
        password: {
          type: String,
          minlength: 6,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          match: emailRegexp,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        // token: {
        //   type: String,
        //   default: null,
        // },
        avatarURL: {
          type: String,
        },
        verify: {
          type: Boolean,
          default: false,
          },
        verificationToken: {
          type: String,
          required: [true, 'Verify token is required'],
          },
}, {versionKey: false, timestamps: true})

userSchema.post('save', handleMongooseError);
userSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);
userSchema.post('findOneAndUpdate', handleMongooseError);

export const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})

const User = model("user", userSchema);

export default User;