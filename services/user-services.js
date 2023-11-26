import User from "../models/User.js";
import HttpError from "../middlewares/httpError.js";

const updateUserDataService = async (_id, body) => {
  const user = await User.UserNew.findOneAndUpdate({ _id }, body, {
    new: true,
  });

  const { avatarURL } = user;

  if (!user) throw HttpError(404, "User not found");

  return { avatarURL };
};

const userService = {
  updateUserDataService,
};

export default userService;
