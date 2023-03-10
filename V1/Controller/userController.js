const { STATUS } = require("../Helper/Constant");
const { errorResponse, successResponse } = require("../Helper/response");
const User = require("../Model/userSchema");
const { registerSevice, loginSevice } = require("../Services/authServices");

//User Registration & Sign up api

exports.register = async (req, res) => {
  var bData = req.body;

  const resData = await registerSevice(bData);
  if (resData[0] == false) {
    res.status(400).send(errorResponse({}, resData[2]));
    return false;
  }
  res.status(200).send(successResponse({ email: resData[1] }, resData[2]));
};

exports.login = async (req, res) => {
  var bData = req.body;
  const resData = await loginSevice(bData);
  if (resData[0] == false) {
    res.status(400).send(errorResponse({}, resData[2]));
    return false;
  }
  res.status(200).send(successResponse(resData[1], resData[2]));
};

exports.getUsers = async (req, res) => {
  try {
    const isLoginUser = await User.findOne({
      email: req.user.email,
      status: { $nin: STATUS.DELETED },
    });
    if (!isLoginUser) {
      res.status(400).send(errorResponse({}, "User Does Not Exists."));
      return false;
    }
    const userData = await User.find({
      status: { $nin: STATUS.DELETED },
    });
    res.status(200).send(successResponse(userData, ""));
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async (req, res) => {
  try {
    const bdata = req.body;
    const isLoginUser = await User.findOne({
      email: req.user.email,
      status: { $nin: STATUS.DELETED },
    });
    if (!isLoginUser) {
      return res.status(400).send(errorResponse({}, "User Does Not Exists."));
    }
    const isUser = await User.findOne({
      email: bdata.email,
      status: { $nin: STATUS.DELETED },
    });
    if (isUser) {
      return res.status(400).send(errorResponse({}, "User already Exists."));
    }
    let updObj = {};
    Object.keys(bdata).map((item) => {
      updObj[item] = bdata[item];
    });

    updObj.updatedAt = new Date();
    updObj && updObj.password && delete updObj.password;
    const userData = await User.updateOne(
      { _id: isLoginUser._id },
      { $set: updObj }
    );
    if (userData && userData.modifiedCount > 0) {
      res.status(200).send(successResponse({}, "User Updated."));
    } else {
      res.status(400).send(errorResponse({}, "User Not Updated."));
    }
  } catch (error) {
    throw error;
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const isLoginUser = await User.findOne({
      email: req.user.email,
      status: { $nin: STATUS.DELETED },
    });
    if (!isLoginUser) {
      res.status(400).send(errorResponse({}, "User Does Not Exists."));
      return false;
    }
    const userData = await User.updateOne(
      { _id: isLoginUser._id },
      { $set: { status: STATUS.DELETED, updatedAt: new Date() } }
    );
    if (userData.modifiedCount > 0) {
      res.status(200).send(successResponse({}, "User Deleted."));
    } else {
      res.status(400).send(errorResponse({}, "User Not Deleted."));
    }
  } catch (error) {
    throw error;
  }
};
