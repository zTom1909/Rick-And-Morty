import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchBar from "../SearchBar/";

import styles from "./Nav.module.css";
import { useState } from "react";

const Nav = ({ hasCharacter, onSearch, logout }) => {
  const [lang, setLang] = useState("es")
  const email = useSelector((state) => state.email);

  const handleLanguage = async (value) => {
    try {
      await axios.put(`http://localhost:3001/rickandmorty/lang`, {
        email,
        lang: value,
      });
      setLang(value)
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      <SearchBar hasCharacter={hasCharacter} onSearch={onSearch} />;
      <button
        className={styles.language}
      >
        <i className="fa-solid fa-globe"></i>
        <div className={styles.dropdownContent}>
          <div
            className={styles.dropdownOption}
            onClick={() => handleLanguage("en")}
          >
            En - English
          </div>
          <div
            className={styles.dropdownOption}
            onClick={() => handleLanguage("es")}
          >
            Es - Español
          </div>
        </div>
        {/* <CustomDropdown
          className={styles.dropdown}
          options={[
            { value: "en", label: "English" },
            { value: "es", label: "Spanish" },
          ]}
          onChange={handleOrder}
          selectedValue={selectedLanguage}
        ></CustomDropdown> */}
      </button>
    </div>
  );
};

export default Nav;
