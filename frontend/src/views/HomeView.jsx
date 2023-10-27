import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CustomButton from "../components/Button";
import AmountBar from "../components/AmountBar";
import TableOfCountries from "../components/TableOfCountries";
import styles from "./HomeView.module.css";
import { CountryCurrencyContext } from "../context/CountryCurrencyContext";
import { useContext } from "react";

const HomeView = () => {
  const { selectedCountry } = useContext(CountryCurrencyContext)
  
  const addCountry = () =>{
    console.log("from home view", selectedCountry);
  }

  const sampleData = [
    ["India", 159, 6.0, 24],
    ["Pakistan", 237, 9.0, 3],
    ["Sweden", 262, 16.0, 24],
    ["Estonia", 305, 3.7, 67],
  ];
  
  const rows = sampleData.map((data) => {
    const [countryName, population, currency, value] = data;
    return addRow(countryName, population, currency, value);
  });
  
  function addRow(countryName, population, currency, value) {
    return { countryName, population, currency, value };
  }

  return (
    <div className={styles.homeContainer}>
      <Header />
      <div className={styles.searchContainer}>
        <SearchBar />
        <AmountBar />
        <div className={styles.buttonContainer}>
          <CustomButton name="ADD TO FAVORITES" onClick={addCountry} />
        </div>
      </div>
      <TableOfCountries/>

    </div>
  );
};

export default HomeView;
