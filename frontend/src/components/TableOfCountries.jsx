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
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function addRow(countryName, population, currency, exchangeRate) {
  return { countryName, population, currency, exchangeRate };
}

export default function TableOfCountries() {
  const { token } = useContext(AuthContext);
  const { amount, selectedCountry } = useContext(CountryCurrencyContext);
  const [rows, setRows] = useState([]);
  const [uniqueCountries, setUniqueCountries] = useState([]);

  useEffect(() => {
    // Trigger the API call when selectedCountry changes
      if (selectedCountry && !rows.some(row => row.countryName === selectedCountry)) {
      fetchCountryData(selectedCountry);
    }
  }, [selectedCountry]);

  const fetchCountryData = async () => {
    try {
      if (!uniqueCountries.includes(selectedCountry)) {
        const response = await axios.get(`/country/name/${selectedCountry}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Official Name</StyledTableCell>
              <StyledTableCell align="right">Population</StyledTableCell>
              <StyledTableCell align="right">Currency</StyledTableCell>
              <StyledTableCell align="right">Exchange Rate</StyledTableCell>
              <StyledTableCell align="right">Conversion Value</StyledTableCell>
            </TableRow>
          </TableHead>
          {rows.length ? (
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.countryName}>
                  <StyledTableCell component="th" scope="row">
                    {row.countryName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.population}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.currency}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.exchangeRate}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {amount? amount*row.exchangeRate : "NA"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <p>The list is empty. Add some countries to display</p>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
