import User from "../models/User.js";
import ControllerWrapper from "../utils/ControllerWrapper.js";
 
const addAvatar = async (req, res) => {
    try {
      const { _id } = req.user;
      const avatarURL = req.file.path;
  console.log(avatarURL);
      await User.UserNew.findByIdAndUpdate(_id, { avatarURL }, { new: true });
      res.status(200).json({ avatarURL });
      
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
    
  const getCurrent = async (req, res) => {
    const { name, email, avatarURL, dailyNorma, gender } = req.user;
        
    res.json({
      name,
      email,
      avatarURL,
      dailyNorma,
      gender
    })
  }

 const updateUserData = async (req, res) => {
  try {
    const { _id } = req.user;
    const updatedData = await User.UserNew.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });

    const { name, email, gender, dailyNorma } = updatedData;

    if (updatedData) {
      res.status(201).json({name, email, gender, dailyNorma});
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
    addAvatar: ControllerWrapper(addAvatar),
    getCurrent: ControllerWrapper(getCurrent),
    updateUserData: ControllerWrapper(updateUserData),
}