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
  if (!userFind) throw HttpError(403, "Email or password is wrong");

  const comparePassword = await bcryptjs.compare(
    body.password,
    userFind.password
  );

  if (!comparePassword) {
    throw HttpError(403, "Email or password is wrong");
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

const authServices = {
  signUp,
  signIn,
  logout,
};

export default authServices;
