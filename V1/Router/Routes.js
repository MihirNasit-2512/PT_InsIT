const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const { verifyToken } = require("../Middleware/jwtVerify");
const {
  validateRegister,
  validateLogin,
  validateUpdate,
} = require("../Middleware/validator");

router.post("/register", validateRegister, userController.register);

router.post("/login", validateLogin, userController.login);

router.get("/getUsers", verifyToken, userController.getUsers);

router.patch(
  "/updateUser",
  verifyToken,
  validateUpdate,
  userController.updateUser
);

router.post("/deleteUser", verifyToken, userController.deleteUser);

module.exports = router;
