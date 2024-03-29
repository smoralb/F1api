const mongoose = require("mongoose");
const app = require("../../app");
var ObjectId = require("mongodb").ObjectId;
const Team = require("../models/teams");

const getTeams = (req, res) => {
  Team.find()
    .exec()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => console.log(error));
};

const getTeamById = async (req, res) => {
  await Team.findById(ObjectId(req.params.id))
    .exec()
    .then((result) => res.send(result))
    .catch((error) => console.error(error));
};

const addTeamForm = (req, res) => {
  res.sendFile(__dirname + "/index.html");
};

const addTeam = (req, res) => {
  new Team({
    name: req.body.name,
    color: req.body.color,
  })
    .save()
    .then((result) => res.send(result))
    .catch((error) => console.error(error));
};

const updateTeamById = (req, res) => {
  Team.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { name: req.body.name, color: req.body.color } }
  )
    .then((result) => res.send(result))
    .catch((error) => console.error(error));
};

const deteleTeamById = (req, res) => {
  Team.deleteOne({ _id: req.params.id })
    .then(res.send("Element deleted"))
    .catch((error) => console.error(error));
};

module.exports = {
  getTeams,
  getTeamById,
  addTeam,
  addTeamForm,
  updateTeamById,
  deteleTeamById,
};
