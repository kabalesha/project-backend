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



// const getCurrent = async (req, res) => {
//   if (!req.user) {
//     return res.status(401).json({ message: 'Пользователь не аутентифицирован' });
//   }
  
//     const { email } = req.user;
//     const result = await User.findOne({ email });
//     if (!result) {
//       HttpError(404, 'Not found');
//     }
//     res.status(200).json(result);
  
// };

const authController = {
  singUp: ControllerWrapper(singUp),
  singIn: ControllerWrapper(singIn),
};

export default authController;
