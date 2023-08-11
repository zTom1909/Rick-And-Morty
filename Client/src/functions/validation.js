const validate = (input, password) => {
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const regexPassword = /^.*[0-9].*/;
  let errors = {};

  Object.keys(input).forEach((field) => {
    const value = input[field];
    switch (field) {
      case "email":
        if (!value) errors.email = "El email no puede estar vacio";
        else if (value.length > 35)
          errors.email = "El email no puede tener mas de 35 caracteres";
        else if (!regexEmail.test(value))
          errors.email = "El email debe ser un email valido";
        else errors.email = "";
        break;
      case "password":
        if (value.length < 6 || value.length > 10)
          errors.password = "La contraseña debe tener entre 6 y 10 caracteres";
        else if (!regexPassword.test(value))
          errors.password = "La contraseña debe tener al menos 1 numero";
        else errors.password = "";
        break;
      case "confirmPassword":
        if (value !== password)
          errors.confirmPassword = "La contraseña debe ser igual a la anterior";
        else errors.confirmPassword = "";
        break;
      default:
        errors.other = "Nuevo campo no configurado";
        break;
    }
  });
  return errors;
};

export default validate;
