const { errorResponse } = require("../Helper/response");
const {
  emailMatch,
  passwordMatch,
  basicMatch,
  mobileMatch,
  addMatch,
} = require("../Helper/utils");

exports.validateRegister = (req, res, next) => {
  var bdata = req.body;
  if (!bdata.firstName) {
    res.status(400).send(errorResponse({}, "Enter first name."));
    return false;
  }
  if (!basicMatch(bdata.firstName)) {
    res
      .status(400)
      .send(
        errorResponse(
          {},
          "firstName contains min 3 and max 20 characters only."
        )
      );
    return false;
  }
  if (bdata && bdata.middleName && !basicMatch(bdata.middleName)) {
    res
      .status(400)
      .send(
        errorResponse(
          {},
          "middleName contains min 3 and max 20 characters only."
        )
      );
    return false;
  }
  if (!bdata.lastName) {
    res.status(400).send(errorResponse({}, "Enter last name."));
    return false;
  }
  if (!basicMatch(bdata.lastName)) {
    res
      .status(400)
      .send(
        errorResponse({}, "lastName contains min 3 and max 20 characters only.")
      );
    return false;
  }
  if (!bdata.email) {
    res.status(400).send(errorResponse({}, "Enter email."));
    return false;
  }
  if (!emailMatch(bdata.email)) {
    res.status(400).send(errorResponse({}, "Enter valid email."));
    return false;
  }
  if (!bdata.mobile) {
    res.status(400).send(errorResponse({}, "Enter mobile number."));
    return false;
  }
  if (!mobileMatch(bdata.mobile)) {
    res.status(400).send(errorResponse({}, "Enter valid mobile number."));
    return false;
  }
  if (!bdata.gender) {
    res.status(400).send(errorResponse({}, "Select gender."));
    return false;
  }
  if (!bdata.address) {
    res.status(400).send(errorResponse({}, "Enter address."));
    return false;
  }
  if (!addMatch(bdata.address)) {
    res
      .status(400)
      .send(errorResponse({}, "Address contains min 5 characters."));
    return false;
  }
  if (!bdata.city) {
    res.status(400).send(errorResponse({}, "Select city."));
    return false;
  }
  if (!bdata.password) {
    res.status(400).send(errorResponse({}, "Enter Password."));
    return false;
  }
  if (!passwordMatch(bdata.password)) {
    res
      .status(400)
      .send(
        errorResponse(
          {},
          "Password must contains 1 Uppercase & Lowercase letter, 1 number, 1 special & min. 8 characters."
        )
      );
    return false;
  }
  next();
};

exports.validateLogin = (req, res, next) => {
  var bdata = req.body;

  if (!bdata.email) {
    res.status(400).send(errorResponse({}, "Enter Email."));
    return false;
  }
  if (!bdata.password) {
    res.status(400).send(errorResponse({}, "Enter Password."));
    return false;
  }
  next();
};

exports.validateUpdate = (req, res, next) => {
  var bdata = req.body;
  for (const item in bdata) {
    switch (item) {
      case "firstName":
        if (!basicMatch(bdata[item])) {
          bdata = {};
          return res
            .status(400)
            .send(
              errorResponse(
                {},
                "firstName contains min 3 and max 20 characters only."
              )
            );
        }
        break;

      case "middleName":
        if (!basicMatch(bdata[item])) {
          bdata = {};
          return res
            .status(400)
            .send(
              errorResponse(
                {},
                "middleName contains min 3 and max 20 characters only."
              )
            );
        }
        break;
      case "lastName":
        if (!basicMatch(bdata[item])) {
          bdata = {};
          return res
            .status(400)
            .send(
              errorResponse(
                {},
                "lastName contains min 3 and max 20 characters only."
              )
            );
        }
        break;

      case "email":
        if (!emailMatch(bdata[item])) {
          bdata = {};
          return res.status(400).send(errorResponse({}, "Enter valid email."));
        }
        break;

      case "mobile":
        if (!mobileMatch(bdata[item])) {
          bdata = {};
          return res
            .status(400)
            .send(errorResponse({}, "Enter valid mobile number."));
        }
        break;

      case "address":
        if (!addMatch(bdata[item])) {
          bdata = {};
          return res
            .status(400)
            .send(errorResponse({}, "Address contains min 5 characters."));
        }
        break;
      default:
        break;
    }
  }
  next();
};
