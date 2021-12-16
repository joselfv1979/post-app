import validator from "email-validator";
import User from "./../models/User";

export const validateUser = (user: User) => {
  if (!user.name) {
    throw new Error("Please fill name field");
  } else if (user.username.length < 3) {
    throw new Error("Enter at least 3 characters in Username");
  } else if (!validator.validate(user.email)) {
    throw new Error("Enter valid values in Email");
  } else if (user.password && user.password.length < 4) {
    throw new Error("Enter at least 4 characters in Password");
  }
  return user;
};
