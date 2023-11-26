import userService from "../services/user-services.js";
import ControllerWrapper from "../utils/ControllerWrapper.js";

const addAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = req.file.path;
  const user = await userService.addAvatarService(_id, avatarURL);

  res.json({ avatarURL: user.avatarURL });
};

const getCurrent = async (req, res) => {
  const { name, email, avatarURL } = req.user;

  res.json({
    name,
    email,
    avatarURL,
  });
};

const updateUserData = async (req, res) => {
  const { _id } = req.user;

  const { name, email, gender, dailyNorma } =
    await userService.updateUserDataService(_id, req.body);

  res.json({ name, email, gender, dailyNorma });
};

export default {
  addAvatar: ControllerWrapper(addAvatar),
  getCurrent: ControllerWrapper(getCurrent),
  updateUserData: ControllerWrapper(updateUserData),
};
