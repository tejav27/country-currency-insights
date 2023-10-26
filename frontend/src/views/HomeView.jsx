import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CustomButton from "../components/Button";
import AmountBar from "../components/AmountBar";
import TableOfCountries from "../components/TableOfCountries";
import styles from "./HomeView.module.css";
import { AmountProvider } from "../context/AmountContext";

const HomeView = () => {
  return (
    <div className={styles.homeContainer}>
      <Header />
      <AmountProvider>
      <div className={styles.searchContainer}>
        <SearchBar />
        <AmountBar />
        <div className={styles.buttonContainer}>
          <CustomButton name="ADD" />
        </div>
      </div>
      <TableOfCountries />
    </AmountProvider>

    </div>
  );
};

export default HomeView;
