import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/";
import styles from "./Nav.module.css";

const Nav = ({ onSearch, logout }) => (
  <div className={styles.container}>
    <button className={styles.logoutButton} onClick={logout}>
      <i className="fa-solid fa-right-from-bracket"></i>
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
    <button className={styles.language}>
    <i class="fa-solid fa-globe"></i>
    </button>
  </div>
);

export default Nav;
