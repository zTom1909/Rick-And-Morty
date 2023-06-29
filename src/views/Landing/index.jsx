import Form from "../../components/Form";
import styles from "./Landing.module.css"

const Landing = ({login}) => {
  return (
    <div className={styles.container}>
      <Form login={login}/>
    </div>
  );
};

export default Landing;
