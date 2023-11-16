import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {HttpError} from "../middlewares/index.js";
import ControllerWrapper from "../utils/ControllerWrapper.js";
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
  
      await User.UserNew.findByIdAndUpdate(_id, { avatarURL }, { new: true });
      res.status(200).json({ avatarURL });
      
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
    
  const getCurrent = async (req, res) => {
    const { name, email, avatarURL } = req.user;
    console.log(req.body);
    
    res.json({
      name,
      email,
      avatarURL,
    })
  }

 const updateUserData = async (req, res) => {
  try {
    const { _id } = req.user;
    // console.log(id);
    const updatedData = await User.UserNew.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });

    const { name, email, gender, dailyNorma } = updatedData;

    await updatedData.save();

    if (updatedData) {
      res.status(201).json(updatedData);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export default {
    addAvatar: ControllerWrapper(addAvatar),
    getCurrent: ControllerWrapper(getCurrent),
    updateUserData: ControllerWrapper(updateUserData),
}