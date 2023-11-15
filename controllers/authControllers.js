import ControllerWrapper from "../utils/ControllerWrapper.js";
import authService from "../services/authServices.js";

const singUp = async (req, res) => {
  const user = await authService.singUp(req.body);

  res.status(201).json({
    user: {
      email: user.email,
    },
  });
};

const singIn = async (req, res) => {
  const { token, user } = await authService.singIn(req.body);

  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

const authController = {
  singUp: ControllerWrapper(singUp),
  singIn: ControllerWrapper(singIn),
};

export default authController;
