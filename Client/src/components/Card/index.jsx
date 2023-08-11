import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { addFav, removeFav } from "../../redux/actions";

import style from "./Card.module.css";

const Card = (props) => {
  const [isFav, setIsFav] = useState(false);

  const email = useSelector((state) => state.email);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3001/rickandmorty/fav/?email=" + email)
      .then(({ data }) => {
        data?.length &&
          data.forEach(({ id }) => id === props.id && setIsFav(true));
      });
  }, [props.id, email]);

  const handleFavorite = () => {
    const { id, name, gender, status, species, origin, image } = props;
    if (isFav) dispatch(removeFav(email, id));
    else
      dispatch(addFav({ id, name, gender, status, species, origin, image }, email));

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
        <img
          className={props.status === "Dead" ? style.imgDead : style.imgAlive}
          src={props.image}
          alt={props.name}
        />
      </div>
    </div>
  );
};

export default Card;
