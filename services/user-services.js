import User from "../models/User.js";
import HttpError from "../middlewares/httpError.js";

const updateUserDataService = async (_id, avatar) => {
  const user = await User.UserNew.findOneAndUpdate(
    { _id },
    { avatarURL: avatar },
    {
      new: true,
    }
  );

  const { avatarURL } = user;
  console.log("avatarURL :>> ", avatarURL);
  if (!user) throw HttpError(404, "User not found");

  return { avatarURL };
};

const userService = {
  updateUserDataService,
};

export default userService;
