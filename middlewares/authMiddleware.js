/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const secretKey = 'piysuh@12';
const verifyAuthenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401); // Unauthorized
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

const getJWTTokken = (username) => {
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return token;
};

module.exports = { verifyAuthenticateToken, getJWTTokken };
