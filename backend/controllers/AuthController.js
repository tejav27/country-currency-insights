const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const config = require('../config/config');

dotenv.config();

module.exports = {
  loginUser: async (req, res) => {
    try {
      let token = jwt.sign(
        {
          user: "randomUser",
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: config.tokenValidityDurationMinutes }
      );

      res.status(200).json(token);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
