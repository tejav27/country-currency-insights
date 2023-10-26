class CurrencyInsightsBaseError extends Error {}

class TokenExpired extends CurrencyInsightsBaseError {
  constructor() {
    super();
    this.message = `Token expired, please log in again`;
    this.errorCode = 401;
  }
}

class UnAuthorized extends CurrencyInsightsBaseError {
  constructor() {
    super();
    this.message = `Unauthorized, please verify your api token`;
    this.errorCode = 401;
  }
}

module.exports = {
  CurrencyInsightsBaseError,
  TokenExpired,
  UnAuthorized
};
