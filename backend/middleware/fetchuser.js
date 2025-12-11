var jwt = require('jsonwebtoken');
const JWT_SECRET = '$rahul$arorak$';

const fetchuser = (req, res, next) => {
  // get the from jwt token and add id to req object
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: 'Please authenticate using a valid token1' });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate using a valid token2' });
  }
  next();
};

module.exports = fetchuser;
