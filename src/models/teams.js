const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: String,
    color: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Teams", teamSchema);
