
const express = require("express");


const auth = express.Router();


const { login, register } = require("../Controllers/auth.controller");
// const { validateEmailAndPassword } = require('../Validators/validator');


auth.use(express.json());

// Define routes with associated controller methods
auth.post("/register",  register); // User registration
auth.post("/login",  login); // User login


module.exports = { auth };
