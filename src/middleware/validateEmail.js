const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!email.match(emailRegex)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
};

module.exports = validateEmail;