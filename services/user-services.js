import User from "../models/User.js";
import HttpError from "../middlewares/httpError.js";

const updateUserDataService = async (_id, body) => {
  const user = await User.UserNew.findOneAndUpdate({ _id }, body, {
    new: true,
  });

  const { name, email, gender, dailyNorma } = user;

  if (!user) throw HttpError(404, "User not found");

  return { name, email, gender, dailyNorma };
};

const userService = {
  updateUserDataService,
};

export default userService;
