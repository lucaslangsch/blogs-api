const { getPayload } = require('../auth/authFunction');

const validateJwt = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let token;
    if (authorization.includes('Bearer')) {
      token = authorization.split(' ')[1];
    } else {
      token = authorization;
    }
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
