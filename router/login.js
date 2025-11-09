const express = require("express");
const {controllerlogin} = require("../controllers/login")

const router = express.Router();

router.post("/", controllerlogin);

module.exports = {router};