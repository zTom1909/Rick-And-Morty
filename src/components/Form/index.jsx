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
      <h2 className={styles.title}>LOGIN</h2>
      <div className={styles.section}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="text"
          name="email"
          className={errors.email ? styles.inputError : styles.input}
          value={userData.email}
          onChange={handleChange}
        />
        {errors.email ? (
          <p className={styles.error}>{errors.email}</p>
        ) : (
          <p className={styles.errorPlaceholder}>placeholder</p>
        )}
      </div>
      <div className={styles.section}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          name="password"
          className={errors.password ? styles.inputError : styles.input}
          value={userData.password}
          onChange={handleChange}
        />
        {errors.password ? (
          <p className={styles.error}>{errors.password}</p>
        ) : (
          <p className={styles.errorPlaceholder}>placeholder</p>
        )}
      </div>
      <button type="submit" className={styles.submit}>
        LOGIN
      </button>
      <div className={styles.forgotPassword}>
        <p onClick={() => alert("What a shame!")}>Forgot Password?</p>
      </div>
    </form>
  );
};

export default Form;
