import style from "./DetailComponent.module.css";
import loadingGif from "./loading.gif";

const DetailComponent = (props) => {
  return (
    <div className={style.container}>
      <div className={style.imageContainer}>
        <div className={style.shadow} />
        {props.image ? (
          <img src={props.image} alt={props.name} />
        ) : (
          <img src={loadingGif} alt="loading" />
        )}
        {props.id && <h2 className={style.text}>{`ID: ${props.id}`}</h2>}
      </div>

      <div className={style.textContainer}>
        {props.name && <h2 className={style.text}>{`Name: ${props.name}`}</h2>}
        {props.species && (
          <h2 className={style.text}>{`Species: ${props.species}`}</h2>
        )}
        {props.gender && (
          <h2 className={style.text}>{`Gender: ${props.gender}`}</h2>
        )}
        {props.origin?.name && (
          <h2 className={style.text}>{`Origin: ${props.origin?.name}`}</h2>
        )}
      </div>
    </div>
  );
};

export default DetailComponent;
