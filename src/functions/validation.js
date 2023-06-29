const validate = ({ email, password }) => {
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const regexPassword = /^.*[0-9].*/
  let errors = {};

  if (!email)
    errors.email = "El email no puede estar vacio";
  else if (email.length > 35)
    errors.email = "El email no puede tener mas de 35 caracteres";
  else if (!regexEmail.test(email))
    errors.email = "El email debe ser un email valido";

    if (password.length < 6 || password.length > 10) errors.password = "La contraseña debe tener entre 6 y 10 caracteres"
    else if (!regexPassword.test(password)) errors.password = "La contraseña debe tener al menos 1 numero"

  return errors;
};

export default validate;
