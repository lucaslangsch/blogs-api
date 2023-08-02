const { getPayload } = require('../auth/authFunction');

const validateJwt = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    if (!authorization) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }
  
    const payload = getPayload(token);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};

module.exports = validateJwt;
