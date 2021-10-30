const express = require("express");

const router = express.Router();


const { getAllPlayers, register, authenticate, logout, deletePlayerById } = require("../controllers/player.controllers");
const { isAuth } = require("../../../middlewares/auth.middleware")

router.get("/", getAllPlayers);
router.post("/register", register);
router.post("/authenticate", authenticate);
router.post("/logout", [isAuth], logout)
router.delete("/:id", deletePlayerById)

module.exports = router;