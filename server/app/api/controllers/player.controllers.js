const Player = require("../models/Player");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../../utils/httpStatusCode");


const getAllPlayers = async (req, res, next) => {
  try {
    if (req.query.page) { 
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      const players = await Player.find().skip(skip).limit(20);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { players: players },
      });
    } else {
      const players = await Player.find();
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { players: players },
      });
    }
  } catch (err) {
    return next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const newPlayer = new Player();
    newPlayer.name = req.body.name;
    newPlayer.email = req.body.email;
    newPlayer.position = req.body.position;
    newPlayer.height = req.body.height;
    newPlayer.password = req.body.password;
    
    const PlayerDb = await newPlayer.save();

    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: PlayerDb
    });
  } catch (err) {
    return next(err);
  }
}


const authenticate = async (req, res, next) => {
  try {
    const playerInfo = await Player.findOne({ email: req.body.email })
    if (bcrypt.compareSync(req.body.password, playerInfo.password)) {
      playerInfo.password = null
      const token = jwt.sign(
        {
          id: playerInfo._id,
          name: playerInfo.name
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { player: playerInfo, token: token },
      });
    } else {
      return res.json({ status: 400, message: HTTPSTATUSCODE[400], data: null });
    }
  } catch (err) {
    return next(err);
  }
}

const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null
    });
  } catch (err) {
    return next(err)
  }
}
const deletePlayerById = async (req, res, next) => {
  try {
      const {id} = req.params;
      await Player.findByIdAndDelete(id);
      return res.status(200).json('Character deleted!');
  } catch (error) {
      return next(error);
  }
};

module.exports = {
  getAllPlayers, register, authenticate, logout, deletePlayerById
}