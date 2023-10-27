import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AuthContext } from "../context/AuthContext";
import { CountryCurrencyContext } from "../context/CountryCurrencyContext";

const SearchBar = () => {
  const [countries, setCountries] = useState([]);
  const { token } = useContext(AuthContext);
  const { setAllCountryNames, setSelectedCountry } = useContext(CountryCurrencyContext)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('/country/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCountries(response.data);
        setAllCountryNames(response.data);
      } catch (error) {
        console.error("Error fetching countries: ", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountrySelection = (event, value) => {
    setSelectedCountry(value);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        id="country-search"
        options={countries}
        sx={{ width: 300 }}
        onChange={handleCountrySelection}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            placeholder="Search for a Country"
            style={{border:'yellow'}}
          />
        )}
      />
    </div>
  );
};

export default SearchBar;
