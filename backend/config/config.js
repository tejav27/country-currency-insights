require("dotenv").config();

const config = {
  tokenValidityDurationMinutes: "30m",
  restCountriesApiUrl: "https://restcountries.com/v3.1/all?fields=population,name,currencies",
  exchangeRatesApiUrl: `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_EXCHANGE_RATES_API_KEY}&base=EUR`
};

module.exports = config;
