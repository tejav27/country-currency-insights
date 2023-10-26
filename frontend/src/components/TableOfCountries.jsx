import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AmountContext } from "../context/AmountContext";

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

// countryCurrencyData = {
//     officialName: countryData.name.official, // Assuming name.official is a string
//     population: countryData.population, // Assuming population is a number
//     currencies: currencySymbols.map((currencySymbol) => ({
//       currency: currencySymbol,
//       exchangeRate: exchangeRatesCache.get(currencySymbol),
//     }

const sampleData = [
  ["India", 159, 6.0, 24],
  ["Pakistan", 237, 9.0, 3],
  ["Sweden", 262, 16.0, 24],
  ["Estonia", 305, 3.7, 67],
];

const rows = sampleData.map((data) => {
  const [countryName, population, currency, value] = data;
  return createData(countryName, population, currency, value);
});

function createData(countryName, population, currency, value) {
  return { countryName, population, currency, value };
}

export default function TableOfCountries() {
  const { amount } = useContext(AmountContext);
  return (<div>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Official Name</StyledTableCell>
            <StyledTableCell align="right">Population</StyledTableCell>
            <StyledTableCell align="right">Currency</StyledTableCell>
            <StyledTableCell align="right">Value&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        {rows.length ? <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.countryName}>
              <StyledTableCell component="th" scope="row">
                {row.countryName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.population}</StyledTableCell>
              <StyledTableCell align="right">{row.currency}</StyledTableCell>
              <StyledTableCell align="right">
                {amount * row.value}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody> : <p>The list is empty. Add some countries to display</p> }
      </Table>
    </TableContainer> 
    </div>
  );
}
