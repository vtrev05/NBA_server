const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const PlayerSchema = new Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  position: { type: String, trim: true, required: true },
  height: { type: Number, trim: true, required: true },
  password: { type: String, trim: true, required: true },
});

PlayerSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});


const Player = mongoose.model("players", PlayerSchema);
module.exports = Player;