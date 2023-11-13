import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {HttpError} from "../middlewares/index.js";
import {ctrlWrapper} from "../decorators/index.js";
import gravatar from "gravatar";
import Jimp from "jimp";
import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";

const {JWT_SECRET, BASE_URL} = process.env;
const avatarsPath = path.resolve("public", "avatars");

 
const addAvatar = async (req, res) => {
    try {
      const { _id } = req.user;
      const avatarURL = req.file.path;
  
      await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
      res.status(200).json({ avatarURL });
      
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
    
 const getCurrent = async(req, res) => {
    const {name, email, avatarURL} = req.user;
    
    res.json({
        name,
        email,
        avatarURL,
    })
 }

 const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsPath, filename);
    await fs.rename(tempUpload, resultUpload);
    const image = await Jimp.read(resultUpload);
    image.cover(250, 250).write(resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    })
 }

export default {
    addAvatar: ctrlWrapper(addAvatar),
    getCurrent: ctrlWrapper(getCurrent),
    updateAvatar: ctrlWrapper(updateAvatar),
}