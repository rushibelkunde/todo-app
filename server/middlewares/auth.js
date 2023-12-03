const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("provided token",token)
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
      req.userId = decoded.id;
      next();
    });
  };