// src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

const auth = () => {
  return (req, res, next) => {
    const token = (req.header('authorization') || '').split(' ')[1];
    if (!token){
      return next();
    }
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).json({ success: false, message: 'Invalid token' });
    }
  };
}

module.exports = auth;
