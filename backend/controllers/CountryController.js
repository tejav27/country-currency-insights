const axios = require("axios");
const NodeCache = require("node-cache");
const config = require("../config/config");

const countriesCache = new NodeCache();
const exchangeRatesCache = new NodeCache({ stdTTL: 3600 }); // expires in 1 hour

module.exports = {
  getCountryByName: async (req, res, next) => {
    try {
      const countryName = req.params.countryName;

      await populateCountryAndExchangeRates();

      const countryData = countriesCache.get(countryName);
      const currencySymbols = Object.keys(countryData.currencies);
      const countryWithExchangeRates = {
        officialName: countryData.name.official,
        population: countryData.population,
        currencies: currencySymbols.map((currencySymbol) => ({
          currency: currencySymbol,
          exchangeRate: exchangeRatesCache.get(currencySymbol)
        }))
      };

      res.status(200).json(countryWithExchangeRates);
    } catch (error) {
      console.error("Error fetching data for the country: ", error);

      next(error);
    }
  },

  getAllCountryNames: async (req, res, next) => {
    try {
      await getAllCountries();

      const countryNames = countriesCache.keys();
      res.status(200).json(countryNames);
    } catch (error) {
      console.error("Error fetching all country names: ", error);

      next(error);
    }
  }
};

const populateCountryAndExchangeRates = async () => {
  await Promise.all([getAllCountries(), getAllExchangeRates()]);
};

const getAllCountries = async () => {
  // Check if the cache is empty and then make the API call only if necessary
  if (countriesCache.getStats().keys === 0) {
    await populateCountriesCache();
  }
};

const getAllExchangeRates = async () => {
  // Check if the cache is empty or any key is expired, and then make the API call only if necessary
  const cacheStats = exchangeRatesCache.getStats();
  const isCacheEmpty = cacheStats.keys === 0;
  const isAnyKeyExpired = cacheStats.expires > 0 && cacheStats.expires < Date.now();

  if (isCacheEmpty || isAnyKeyExpired) {
    await populateExchangeRatesCache();
  }
};

const populateCountriesCache = async () => {
  try {
    // const response = await axios.get(config.restCountriesApiUrl);
    // response.data.forEach((country) => {
    //   countriesCache.set(country.name.common, country);
    // });

    getCountryMockData().forEach((item) => {
      countriesCache.set(item.name.common, item);
    });
  } catch (error) {
    console.error("Error fetching countries data from rest-countries API: ", error);

    throw error;
  }
};

const populateExchangeRatesCache = async () => {
  try {
    // Extract rates from the response and set them in the cache with the currency symbol as the key
    // const response = await axios.get(config.exchangeRatesApiUrl);
    // const data = response.data;
    //   if (data.success) {
    //     const { rates } = data;
    //     Object.keys(rates).forEach((currency) => {
    //       exchangeRatesCache.set(currency, rates[currency]);
    //     });
    //   }

    const { rates } = getExchangeRateMockData();
    Object.keys(rates).forEach((currency) => {
      exchangeRatesCache.set(currency, rates[currency]);
    });
  } catch (error) {
    console.error("Error fetching exchange rates from fixer API: ", error);

    throw error;
  }
};

const getCountryMockData = () => {
  return [
    {
      name: {
        common: "Uzbekistan",
        official: "Republic of Uzbekistan",
        nativeName: {
          rus: {
            official: "Республика Узбекистан",
            common: "Узбекистан"
          },
          uzb: {
            official: "O'zbekiston Respublikasi",
            common: "O‘zbekiston"
          }
        }
      },
      currencies: {
        UZS: {
          name: "Uzbekistani soʻm",
          symbol: "so'm"
        }
      },
      population: 34232050
    },
    {
      name: {
        common: "Austria",
        official: "Republic of Austria",
        nativeName: {
          bar: {
            official: "Republik Österreich",
            common: "Österreich"
          }
        }
      },
      currencies: {
        EUR: {
          name: "Euro",
          symbol: "€"
        }
      },
      population: 8917205
    }
  ];
};

const getExchangeRateMockData = () => {
  return {
    success: true,
    timestamp: 1519296206,
    base: "USD",
    date: "2023-10-25",
    rates: {
      GBP: 0.72007,
      JPY: 107.346001,
      EUR: 0.813399,
      UZS: 0.61234
    }
  };
};
