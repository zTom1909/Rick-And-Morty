import { useState } from "react";
import styles from "./Form.module.css";

import validate from "../../functions/validation";

const Form = ({ login }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    setErrors(
      validate({ ...userData, [event.target.name]: event.target.value })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errorHandler = validate(userData);
    setErrors(errorHandler);
    const errorsArray = Object.values(errorHandler);
    if (errorsArray.length)
      return alert("Se encontraron errores, revisalos e intenta nuevamente");

    login(userData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.section}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="text"
          name="email"
          className={styles.input}
          value={userData.email}
          onChange={handleChange}
        />
        <p className={styles.error}>{errors.email}</p>
      </div>
      <div className={styles.section}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          name="password"
          className={styles.input}
          value={userData.password}
          onChange={handleChange}
        />
        <p className={styles.error}>{errors.password}</p>
      </div>
      <button type="submit" className={styles.submit}>
        Submit
      </button>
    </form>
  );
};

export default Form;
