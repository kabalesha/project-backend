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

const current = async (req, res) => {
  const user = req.user;

  res.send(200).json({ user: user.token });
};

const authController = {
  signUp: ControllerWrapper(signUp),
  signIn: ControllerWrapper(signIn),
  logout: ControllerWrapper(logout),
  current: ControllerWrapper(current),
};

export default authController;
