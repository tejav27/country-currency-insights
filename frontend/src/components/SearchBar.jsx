import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SearchBar = () => {
  return (
    <div>
      <Autocomplete
        disablePortal
        id="country-search"
        options={getCountryMockData}
        sx={{ width: 300 }}
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

const getCountryMockData = [
  {
    label: "Uzbekistan",
  },
  {
    label: "Sweden",
  },
  {
    label: "Austria",
  },
  {
    label: "India",
  },
];

export default SearchBar;
