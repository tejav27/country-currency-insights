import React, { createContext, useState } from 'react';

// Create the context
export const CountryCurrencyContext = createContext();

// Create a provider component to wrap the components that need access to the shared state
export const CountryCurrencyProvider = ({ children }) => {
  const [amount, setAmount] = useState(0);
  const [allCountryNames, setAllCountryNames] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});

  return (
    <CountryCurrencyContext.Provider value={{ amount, setAmount, allCountryNames, setAllCountryNames, countryInfo, setCountryInfo, selectedCountry, setSelectedCountry }}>
      {children}
    </CountryCurrencyContext.Provider>
  );
};
