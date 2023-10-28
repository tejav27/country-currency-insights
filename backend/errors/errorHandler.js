const { CurrencyInsightsBaseError } = require("../errors");

module.exports = {
  errorHandler(error, req, res, next) {
    if (error instanceof CurrencyInsightsBaseError) {
      res.status(error.errorCode).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({
        error: "Something went wrong, please contact your system admin"
      });
    }
  }
};
