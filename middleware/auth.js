const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log(req.headers.authorization);
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'jwtsecret');
    req.user = decoded.user;
    console.log(req.user)
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
