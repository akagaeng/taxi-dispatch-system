const {createError} = require('./util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    const token = bearerHeader.replace("Bearer ", "");
    req.decoded = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json(createError(419, 'Token expired'));
    }
    return res.status(401).json(createError(401, 'Invalid token.'));
  }
};

exports.verifyNotRequired = (req, res, next) => {
  next();
};

exports.compareHashedPassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

exports.generateHash = async (password, saltRounds = 12) => {
  return bcrypt.hash(password, saltRounds);
};

exports.generateToken = async ({account_id, email}) => {
  const payload = {account_id, email};
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    return new Error('Secret key not exists.');
  }

  const options = {
    algorithm: 'HS256',
    expiresIn: '24h',
    issuer: 'akagaeng'
  };

  return jwt.sign(payload, secretKey, options);
};
