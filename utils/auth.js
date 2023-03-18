const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const exp = process.env.EXPIRATION;

module.exports = {
  authMiddleware: function(req, _, next) {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(' ').pop().trim();

      try {
        const { data } = jwt.verify(token, secret, { maxAge: exp });
        req.user = data;
        next();
      } catch ({ message }) {
        // !!! message: invalid signature
        next();
      }

    } else {
      next();
    }
  },

  signToken: function(username, _id) {
    const payload = { _id, username };
    
    return jwt.sign({ data: payload }, secret, { expiresIn: exp });
  }
}