const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("please enter valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter strong password");
  }
};

const validateProfileData = (req) => {
  const allowedEditFields = [
    "firstname",
    "lastname",
    "gender",
    "age",
    "photoUrl",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field),
  );
};

module.exports = { validateSignUpData, validateProfileData };
