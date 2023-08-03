const { getPayload } = require('../auth/authFunction');

const validateJwt = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }
  
    const payload = getPayload(authorization);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
};

module.exports = validateJwt;