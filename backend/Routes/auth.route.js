
const express = require("express");


const auth = express.Router();


const { login, register,getSingleUser } = require("../Controllers/auth.controller");
const { validateUsernameAndPassword } = require('../Validators/validator');


auth.use(express.json());

// Define routes with associated controller methods
auth.post("/register", validateUsernameAndPassword, register); // User registration
auth.post("/login", validateUsernameAndPassword, login); // User login
auth.get("/:id", getSingleUser);


module.exports = { auth };
