import Header from "../components/Header";
import Footer from "../components/Footer";
import CountrySelector from "../components/CountrySelector";
import AmountInput from "../components/AmountInput";
import CountryExchangeRateTable from "../components/CountryExchangeRateTable";
import styles from "./HomeView.module.css";

const HomeView = () => {
  return (
    <div className={styles.homeContainer}>
      <Header />
      <div className={styles.searchContainer}>
        <CountrySelector />
        <AmountInput />
      </div>
      <CountryExchangeRateTable />
      <Footer />
    </div>
  );
};

export default HomeView;
