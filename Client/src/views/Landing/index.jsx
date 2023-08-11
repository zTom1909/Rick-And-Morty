import Form from "../../components/Form";
import styles from "./Landing.module.css"

const Landing = ({register, login}) => {
  return (
    <div className={styles.container}>
      <Form register={register} login={login}/>
    </div>
  );
};

export default Landing;
