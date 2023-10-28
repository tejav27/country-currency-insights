import React from "react";
import { useEffect, useContext } from "react";
import api from "../config/api";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AuthContext } from "../context/AuthContext";
import { CountryCurrencyContext } from "../context/CountryCurrencyContext";

const CountrySelector = () => {
  const { token } = useContext(AuthContext);
  const { allCountryNames, setAllCountryNames, setSelectedCountry } =
    useContext(CountryCurrencyContext);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/countries", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAllCountryNames(response.data);
      } catch (error) {
        console.error("Error fetching countries: ", error);
      }
    };

    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountrySelection = (event, value) => {
    setSelectedCountry(value);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        id="country-search"
        options={allCountryNames}
        sx={{ width: 300 }}
        onChange={handleCountrySelection}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            placeholder="Search for a Country"
            style={{ border: "yellow" }}
          />
        )}
      />
    </div>
  );
};

export default CountrySelector;
