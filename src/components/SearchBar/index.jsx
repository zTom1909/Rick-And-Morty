import { useNavigate } from "react-router-dom";
import style from "./SearchBar.module.css";
import { useState } from "react";

const SearchBar = (props) => {
  const [id, setId] = useState("");
  const navigate = useNavigate()

  const handleSearch = () => {
    props.onSearch(id);
    setId("");
    navigate("/home")
  };
  const handleInputUpdate = (event) => setId(event.target.value);
  const handleKeyPress = (event) => event.key === "Enter" && handleSearch();
  const handleRandom = () => setId(String(Math.floor(Math.random() * 826) + 1));

  return (
    <div className={style.container}>
      <input
        type="search"
        onChange={handleInputUpdate}
        onKeyPress={handleKeyPress}
        placeholder="Escriba la ID del personaje a agregar"
        value={id}
      />
      <div className={style.buttonSection}>
        <button className={style.searchButton} onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button className={style.randomButton} onClick={handleRandom}>
          <i className="fa-solid fa-dice"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
