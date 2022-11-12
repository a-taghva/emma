const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  signToken({ _id, username, employees }) {
    const payload = { _id, username, employees };
    return jwt.sign({data: payload}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
  },

  authMiddleware(req, res, next) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization; 

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    };

    if (!token) {
      return req;
    };

    try {
      const { data } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { maxAge:  '10m' });
      req.user = data;
    } catch(e) {
      console.log('message: ', e.message);
    }

    next();
  }

}