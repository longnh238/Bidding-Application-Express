const express = require("express");
const { getRamdomUser } = require("../controllers/UserController");

const router = express.Router();

router.get("/getRandomUser", getRamdomUser);

module.exports = router;
