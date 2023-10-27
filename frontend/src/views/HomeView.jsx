import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CustomButton from "../components/Button";
import AmountBar from "../components/AmountBar";
import TableOfCountries from "../components/TableOfCountries";
import styles from "./HomeView.module.css";

const HomeView = () => {
  
  return (
    <div className={styles.homeContainer}>
      <Header />
      <div className={styles.searchContainer}>
        <SearchBar />
        <AmountBar />
        <div className={styles.buttonContainer}>
          <CustomButton name="ADD TO FAVORITES" />
        </div>
      </div>
      <TableOfCountries/>
      <Footer/>

    </div>
  );
};

export default HomeView;
