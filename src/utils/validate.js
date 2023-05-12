// src/utils/validate.js
export const validateEmail = (email) => {
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};
