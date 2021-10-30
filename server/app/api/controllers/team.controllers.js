const Team = require("../models/Team");

const HTTPSTATUSCODE = require("../../../utils/httpStatusCode");


const getAllTeams = async (req, res, next) => {
  try {
    if (req.query.page) { 
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      const players = await Team.find().skip(skip).limit(20);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { players: players },
      });
    } else {
      const players = await Team.find().populate('players');
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
    const newUser = new Team();
    newUser.name = req.body.name;
    newUser.description = req.body.description;
    newUser.players = req.body.players
    
    const userDb = await newUser.save();

    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: userDb
    });
  } catch (err) {
    return next(err);
  }
}


module.exports = {
    getAllTeams, register
}