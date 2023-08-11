import { useState } from "react";
import styles from "./Form.module.css";

import validate from "../../functions/validation";

const Form = ({ register, login }) => {
  const [isRegister, setIsRegister] = useState(true);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [visiblePassword, setVisiblePassword] = useState(false);

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

    isRegister ? register(userData) : login(userData);
  };

  const handleVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2 className={styles.title}>{isRegister ? "REGISTER" : "LOGIN"}</h2>
      <div className={styles.section}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
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
        <div className={styles.inputPassword}>
          <input
            type={visiblePassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={errors.password ? styles.inputError : styles.input}
            value={userData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className={styles.visibility}
            onClick={() => handleVisibility()}
          >
            <i
              className={
                visiblePassword
                  ? "fa-regular fa-eye"
                  : "fa-regular fa-eye-slash"
              }
            ></i>
          </button>
        </div>
        {errors.password ? (
          <p className={styles.error}>{errors.password}</p>
        ) : (
          <p className={styles.errorPlaceholder}>placeholder</p>
        )}
      </div>
      <button type="submit" className={styles.submit}>
        {isRegister ? "REGISTER" : "LOGIN"}
      </button>
      <div className={styles.forgotPassword}>
        {isRegister ? (
          <p onClick={() => setIsRegister(false)}>
            Already registered? Log In
          </p>
        ) : (
          <p onClick={() => alert("Check github's readme to access ;)")}>
            Forgot Password?
          </p>
        )}
      </div>
    </form>
  );
};

export default Form;
