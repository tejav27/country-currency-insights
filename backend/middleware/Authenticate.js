const jwt = require("jsonwebtoken");
const { TokenExpired, UnAuthorized } = require("../errors");

require("dotenv").config();

module.exports = {
  async isLoggedIn(req, res, next) {
    try {
      const user = verifyToken(req);
      if (!user) {
        throw new Error();
      }
      next();
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  },
};

function verifyToken(req) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenExpired();
    } else {
      throw new UnAuthorized();
    }
  }
}
