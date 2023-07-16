const { User } = require('../models');
const { createToken } = require('../auth/authFunction');

const signIn = async (email, password) => {
  const isBodyValid = (emailS, passwordS) => emailS && passwordS;
  if (!isBodyValid(email, password)) {
    return { status: 'BAD_REQUEST', data: { message: 'Some required fields are missing' } };
  }

  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }

  const { password: _password, ...userWithoutPassword } = user.dataValues;
  const payload = { data: userWithoutPassword };
  const token = createToken(payload);

  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = {
  signIn,
};