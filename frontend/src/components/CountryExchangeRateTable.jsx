import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AuthContext } from "../context/AuthContext";
import { CountryCurrencyContext } from "../context/CountryCurrencyContext";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2E3B55",
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

function addRow(countryName, population, currency, exchangeRate) {
  return { countryName, population, currency, exchangeRate };
}

export default function CountryExchangeRateTable() {
  const { token } = useContext(AuthContext);
  const { amount, selectedCountry } = useContext(CountryCurrencyContext);
  const [rows, setRows] = useState([]);
  const [uniqueCountries, setUniqueCountries] = useState([]);

  useEffect(() => {
    // Trigger the API call only when 'selectedCountry' changes
    if (
      selectedCountry &&
      Object.keys(selectedCountry).length > 0 &&
      !rows.some((row) => row.countryName === selectedCountry)
    ) {
      fetchCountryData(selectedCountry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  const fetchCountryData = async () => {
    try {
      if (!uniqueCountries.includes(selectedCountry)) {
        const response = await axios.get(`/countries/${selectedCountry}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { officialName, population, currencies } = response.data;
        const currency = currencies[0].currency;
        const exchangeRate = currencies[0].exchangeRate;
        const newRow = addRow(officialName, population, currency, exchangeRate);
        setRows([...rows, newRow]);
        setUniqueCountries([...uniqueCountries, selectedCountry]);
      }
    } catch (error) {
      console.error("Error getting country data: ", error);
    }
  };

  const formatPopulation = (population) => {
    return (population / 1000000).toFixed(2) + " M";
  };

  const formatConversionValue = (value) => {
    return value.toFixed(3);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Official Name</StyledTableCell>
              <StyledTableCell align="center">Population (Millions)</StyledTableCell>
              <StyledTableCell align="center">Currency (Code)</StyledTableCell>
              <StyledTableCell align="center">Exchange Rate</StyledTableCell>
              <StyledTableCell align="center">Conversion Value</StyledTableCell>
            </TableRow>
          </TableHead>
          {rows.length ? (
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.countryName}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.countryName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {formatPopulation(row.population)}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.currency}</StyledTableCell>
                  <StyledTableCell align="center">{row.exchangeRate}</StyledTableCell>
                  <StyledTableCell align="center">
                    {isNaN(amount) ? "NA" : formatConversionValue(amount * row.exchangeRate)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center" style={{ fontStyle: "italic" }}>
                  No countries to display. Add your favourite countries to the list.
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
