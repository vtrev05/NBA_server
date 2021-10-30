const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: "players", required: true }],
});


const Team = mongoose.model("teams", TeamSchema);
module.exports = Team;