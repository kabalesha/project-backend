import ControllerWrapper from "../utils/ControllerWrapper.js";
import authService from "../services/auth-services.js";

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

const logout = async (req, res) => {
  await authService.logout(req.user._id);

  res.status(204).json({ message: "Logout success" });
};

const authController = {
  signUp: ControllerWrapper(signUp),
  signIn: ControllerWrapper(signIn),
  logout: ControllerWrapper(logout),
};

export default authController;
