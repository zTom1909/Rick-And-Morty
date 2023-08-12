import { useState } from "react";
import styles from "./Form.module.css";

import validate from "../../functions/validation";

const Form = ({ register, login }) => {
  const [isRegister, setIsRegister] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    setErrors((previousErrors) => ({
      ...previousErrors,
      ...validate({ [name]: value }, userData.password, isRegister),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errorHandler = validate(userData, userData.password, isRegister);
    setErrors(errorHandler);
    const errorsArray = Object.values(errorHandler).filter(
      (value) => value !== ""
    );
    if (errorsArray.length)
      return alert("Se encontraron errores, revisalos e intenta nuevamente");

    isRegister ? register(userData) : login(userData);
  };

  const handleVisibility = (event) => {
    if (event.target.classList.value.includes("password"))
      setVisiblePassword(!visiblePassword);
    else setVisibleConfirmPassword(!visibleConfirmPassword);
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
        {errors.email && <p className={styles.error}>{errors.email}</p>}
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
            className={`${styles.visibility} password`}
            onClick={handleVisibility}
          >
            <i
              className={
                visiblePassword
                  ? "fa-regular fa-eye password"
                  : "fa-regular fa-eye-slash password"
              }
            ></i>
          </button>
        </div>
        {errors.password && <p className={styles.error}>{errors.password}</p>}
      </div>
      {!isRegister && (
        <div className={styles.forgotPassword}>
          <p onClick={() => alert("Skill issue")}>
            <span>Forgot password?</span>
          </p>
        </div>
      )}
      {isRegister && (
        <div className={styles.section}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <div className={styles.inputPassword}>
            <input
              type={visibleConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className={
                errors.confirmPassword ? styles.inputError : styles.input
              }
              value={userData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className={`${styles.visibility} confirmPassword`}
              onClick={handleVisibility}
            >
              <i
                className={
                  visibleConfirmPassword
                    ? "fa-regular fa-eye confirmPassword"
                    : "fa-regular fa-eye-slash confirmPassword"
                }
              ></i>
            </button>
          </div>
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}
        </div>
      )}
      <button type="submit" className={styles.submit}>
        SUBMIT
      </button>
      <div className={styles.forgotPassword}>
        {isRegister ? (
          <p onClick={() => setIsRegister(false)}>
            Already have an account? <span>Log in</span>
          </p>
        ) : (
          <p onClick={() => setIsRegister(true)}>
            Don't have an account? <span>Create Account</span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Form;
