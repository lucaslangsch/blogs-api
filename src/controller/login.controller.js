const { signInService } = require('../service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await signInService.signIn(email, password);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  signIn,
};