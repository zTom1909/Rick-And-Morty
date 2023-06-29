import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/";
import styles from "./Nav.module.css";

const Nav = ({ onSearch, logout }) => (
  <div className={styles.container}>
    <button className={styles.navigationButton} onClick={logout}>
      Log Out
    </button>
    <div className={styles.container2}>
      <Link to="/home">
        <button className={styles.navigationButton}>Home</button>
      </Link>
      <Link to="/about">
        <button className={styles.navigationButton}>About</button>
      </Link>
      <Link to="/favorites">
        <button className={styles.navigationButton}>Favorites</button>
      </Link>
    </div>
    <SearchBar onSearch={onSearch} />;
  </div>
);

export default Nav;
