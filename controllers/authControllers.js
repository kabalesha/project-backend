import ControllerWrapper from "../utils/ControllerWrapper.js";
import authService from "../services/authServices.js";

const signUp = async (req, res) => {
  const user = await authService.signUp(req.body);

  res.status(201).json({
    user,
    user: {
      id: user._id,
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

// const logout = async (req, res) => {
//   console.log("req.body :>> ", req.user);
//   const user = await authService.logout(req.body);
//   console.log("user2222 :>> ", user);
//   res.status(204).json({ message: "Logout success" });
// };

const authController = {
  signUp: ControllerWrapper(signUp),
  signIn: ControllerWrapper(signIn),
  //   logout: ControllerWrapper(logout),
};

export default authController;
