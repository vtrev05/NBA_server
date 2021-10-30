const express = require("express");

const router = express.Router();

const { getAllTeams, register } = require("../controllers/team.controllers");
router.post("/register", register);
router.get("/", getAllTeams);

module.exports = router;