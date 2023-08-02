const { signInService } = require('../service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const signUp = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { status, data } = await signInService.signUp(displayName, email, password, image);
  res.status(mapStatusHTTP(status)).json(data);
};

const getAllUser = async (req, res) => {
  const { status, data } = await signInService.getAllUser();
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  signUp,
  getAllUser,
};