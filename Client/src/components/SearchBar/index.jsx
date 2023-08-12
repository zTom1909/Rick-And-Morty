import { useNavigate } from "react-router-dom";
import style from "./SearchBar.module.css";
import { useState } from "react";

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (id) => {
    id ? props.onSearch(id) : props.onSearch(inputValue);
    setInputValue("");
    navigate("/home");
  };
  const handleInputUpdate = (event) => setInputValue(event.target.value);
  const handleKeyPress = (event) => event.key === "Enter" && handleSearch();
  const handleRandom = () => {
    let randomNumber = Math.floor(Math.random() * 826) + 1;
    while (props.hasCharacter(randomNumber)) {
      randomNumber = Math.floor(Math.random() * 826) + 1;
    }
    handleSearch(String(randomNumber));
  };

  return (
    <div className={style.container}>
      <input
        type="search"
        onChange={handleInputUpdate}
        onKeyPress={handleKeyPress}
        placeholder="Type either an ID or Name to search"
        value={inputValue}
      />
      <div className={style.buttonSection}>
        <button className={style.searchButton} onClick={() => handleSearch()}>
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
