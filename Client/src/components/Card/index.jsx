import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { addFav, removeFav } from "../../redux/actions";

import style from "./Card.module.css";

const Card = (props) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    axios("http://localhost:3001/rickandmorty/fav/").then(({data}) => {
      data?.length && data.forEach(({ id }) => id === props.id && setIsFav(true));
    })
  }, [props.id]);

  const handleFavorite = () => {
    if (isFav) props.removeFav(props.id);
    else props.addFav(props);

    setIsFav(!isFav);
  };

  return (
    <div className={style.container}>
      <div className={style.imageContainer}>
        <button
          className={style.closeButton}
          onClick={() => props.onClose(props.id)}
        >
          <i className="fas fa-times"></i>
        </button>
        {isFav ? (
          <button className={style.favButton1} onClick={handleFavorite}>
            <i className="fa-solid fa-heart" />
          </button>
        ) : (
          <button className={style.favButton2} onClick={handleFavorite}>
            <i className="fa-regular fa-heart" />
          </button>
        )}
        <Link className={style.textContainer} to={`/detail/${props.id}`}>
          <h2 className={style.text}>{props.name}</h2>
        </Link>
        <img className={props.status === "Dead" ? style.imgDead : style.imgAlive} src={props.image} alt={props.name} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addFav: (character) => dispatch(addFav(character)),
  removeFav: (id) => dispatch(removeFav(id)),
});

export default connect(null, mapDispatchToProps)(Card);
