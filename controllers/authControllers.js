import ControllerWrapper from "../utils/ControllerWrapper.js";
import authService from "../services/authServices.js";

const signUp = async (req, res) => {
  const user = await authService.signUp(req.body);

  res.status(201).json({
    user: {
      email: user.email,
    },
  });
};

const signIn = async (req, res) => {
  const { token, user } = await authService.signIn(req.body);

  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

const authController = {
  signUp: ControllerWrapper(signUp),
  signIn: ControllerWrapper(signIn),
};

export default authController;
