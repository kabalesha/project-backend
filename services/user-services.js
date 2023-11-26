import User from "../models/User.js";
import HttpError from "../middlewares/httpError.js";

const addAvatarService = async (_id, avatarURL) => {
  const user = await User.UserNew.findByIdAndUpdate(
    _id,
    { avatarURL },
    { new: true }
  );

  if (!user) throw HttpError(404, "User not found");

  return { avatarURL: user.avatarURL };
};

const updateUserDataService = async (_id, body) => {
  const user = await User.UserNew.findOneAndUpdate({ _id }, body, {
    new: true,
  });

  const { name, email, gender, dailyNorma } = user;

  if (!user) throw HttpError(404, "User not found");

  return { name, email, gender, dailyNorma };
};

const userService = {
  addAvatarService,
  updateUserDataService,
};

export default userService;
