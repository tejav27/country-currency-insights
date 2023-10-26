const axios = require("axios");
const NodeCache = require("node-cache");
const config = require("../config/config");

const countriesCache = new NodeCache();
const exchangeRatesCache = new NodeCache({ stdTTL: 3600 }); // expires in 1 hour

module.exports = {
  getCountryByName: async (req, res, next) => {
    try {
      const countryName = req.params.countryName;

      // Check if the cache is empty and then make the API call
      if (countriesCache.getStats().keys === 0) {
        getAllCountriesNames();
      }
      if (exchangeRatesCache.getStats().keys === 0) {
        getAllExchangeRates();
      }

      const countryData = countriesCache.get(countryName);

      const currencySymbols = Object.keys(countryData.currencies);
      const countryCurrencyData = {
        officialName: countryData.name.official, // Assuming name.official is a string
        population: countryData.population, // Assuming population is a number
        currencies: currencySymbols.map((currencySymbol) => ({
          currency: currencySymbol,
          exchangeRate: exchangeRatesCache.get(currencySymbol),
        })),
      };

      res.json(countryCurrencyData);
    } catch (error) {
      console.error("Error fetching data for the country: ", error);

      next(error);
    }
  },
};

const populateMetaData = async () => {
  await Promise.all([getAllCountriesNames(), getAllExchangeRates()]);
};

const getAllCountriesNames = async () => {
  try {
    // const response = await axios.get(config.restCountriesApiUrl);
    // response.data.forEach((country) => {
    //   countriesCache.set(country.name.common, country);
    // });
    // res.json(response.data);

    getCountryMockData().forEach((item) => {
      countriesCache.set(item.name.common, item);
    });
  } catch (error) {
    console.error("Error fetching data from rest-countries Api: ", error);

    throw error;
  }
};

const getAllExchangeRates = async () => {
  try {
    // Extract rates from the response and set them in the cache with the currency symbol as the key
    // const response = await axios.get(FIXER_EXCHANGE_RATES_API_URL);
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
    console.error("Error fetching data from rest-countries Api: ", error);

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
            common: "Узбекистан",
          },
          uzb: {
            official: "O'zbekiston Respublikasi",
            common: "O‘zbekiston",
          },
        },
      },
      currencies: {
        UZS: {
          name: "Uzbekistani soʻm",
          symbol: "so'm",
        },
      },
      population: 34232050,
    },
    {
      name: {
        common: "Austria",
        official: "Republic of Austria",
        nativeName: {
          bar: {
            official: "Republik Österreich",
            common: "Österreich",
          },
        },
      },
      currencies: {
        EUR: {
          name: "Euro",
          symbol: "€",
        },
      },
      population: 8917205,
    },
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
    },
  };
};
