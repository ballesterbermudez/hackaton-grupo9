const express = require("express");
const route = express.Router();
const usersController = require("../controllers/usersController");
const { login } = require("../controllers/loginControllers");
const verifyJWT = require("../middelware/verifyJWT");

//Rutas de users
route.get("/", verifyJWT, usersController.listUsers);
route.get(
  "/:userId",
  verifyJWT,
  usersController.findUserById
);
route.post(
  "/",
  verifyJWT,
  usersController.createUser
);
route.put(
  "/:userId",
  verifyJWT,
  usersController.editUser
);
route.delete(
  "/:userId",
  verifyJWT,
  usersController.deleteUser
);

//Rutas alias de login
route.post("/login", login);

module.exports = route;
