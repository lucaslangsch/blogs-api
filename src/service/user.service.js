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
  const payload = userWithoutPassword;
  const token = createToken(payload);

  return { status: 'SUCCESSFUL', data: { token } };
};

const signUp = async (displayName, email, password, image) => {
  const userExist = await User.findOne({ where: { email } });
  if (userExist) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  const newUser = await User.create({ displayName, email, password, image });

  const { password: _password, ...userWithoutPassword } = newUser.dataValues;

  const payload = { data: userWithoutPassword };
  const token = createToken(payload);

  return { status: 'CREATED', data: { token } };
};

const getAllUser = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  // const usersWithoutPassword = users.map(user => {
  //   const { password, ...userWithoutPassword } = user.dataValues;
  //   return userWithoutPassword;
  // });

  return { status: 'SUCCESSFUL', data: users };
};

module.exports = {
  signIn,
  signUp,
  getAllUser,
};