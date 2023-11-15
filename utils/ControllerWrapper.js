// const ControllerWrapper = (controller) => {
//   return (req, res, next) => {
//     controller(req, res).catch(next);
//   };
// };

const ControllerWrapper = ctrl => {
  const func = async(req, res, next) => {
  try {
      await ctrl(req, res, next)
  } catch (error) {
      next(error)        
  }
}
return func;
}

export default ControllerWrapper;
