import User from "../models/User.js";
import HttpError from "../middlewares/httpError.js";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const signUp = async (body) => {
  const { email, password, repeatPassword } = body;

  const user = await User.UserNew.findOne({ email });
  if (user) throw HttpError(409, `Email "${email}" in use`);

  if (password !== repeatPassword)
    throw HttpError(409, `Passwords do not match`);

  const hashPassword = await bcryptjs.hash(password, 10);
  const verificationToken = uuidv4();

  return await User.UserNew.create({
    ...body,
    password: hashPassword,
    verificationToken,
  });
};

const signIn = async (body) => {
  const userFind = await User.UserNew.findOne({ email: body.email });
  if (!userFind) throw HttpError(401, "Email or password is wrong");

  const comparePassword = await bcryptjs.compare(
    body.password,
    userFind.password
  );

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: userFind._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  const user = await User.UserNew.findByIdAndUpdate(userFind._id, { token });

  return {
    token,
    user,
  };
};

const logout = async (userId) => {
  const user = await User.UserNew.findByIdAndUpdate(
    { _id: userId },
    { token: "" }
  );
  if (!user) throw HttpError(404, "User not found");
};

const verifyUser = async (verificationToken) => {
  const userVerify = await User.UserNew.findOne({ verificationToken });

  if (!userVerify) throw HttpError(404, "User not found");

  const user = await User.UserNew.findByIdAndUpdate(
    userVerify._id,
    {
      verify: true,
      verificationToken: null,
    },
    { new: true }
  );

  return user;
};

const refresh = async (body) => {
  const { token, email } = body;

  const userFind = await User.UserNew.findOne({ email }, { token });
  if (!userFind) throw HttpError(401, "User not found");

  //  const { accessToken, refreshToken } = assignToken(user);
  //  await User.findByIdAndUpdate(user._id, { refreshToken });

  return {
    email,
  };
};

const authServices = {
  signUp,
  signIn,
  logout,
  verifyUser,
  refresh,
};

export default authServices;
