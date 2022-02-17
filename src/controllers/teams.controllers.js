const mongoose = require("mongoose");
const { response } = require("../../app");
const app = require("../../app");
const teams = require("../models/teams");
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
    .then((response) => {
      if (response.matchedCount == 0) {
        getResponse(res, 410, "No se ha econtrado ese elemento");
      } else if (response.modifedCount == 0) {
        getResponse(res, 500, "No se ha podido modificar el elemento");
      } else getResponse(res, 200, "Elemento correctamente actualizado");
    })
    .catch((error) => console.error(error));
};

const deteleTeamById = (req, res) => {
  Team.deleteOne({ _id: req.params.id })
    .then((response) => {
      if (response.deletedCount == 0) {
        getResponse(res, 410, "Este item ya ha sido eliminado");
      } else {
        getResponse(res, 200, "Item eliminado correctamente");
      }
    })
    .catch((error) => console.error(error));
};

function getResponse(res, code, responseMessage) {
  return res.status(code).json({ message: responseMessage });
}

module.exports = {
  getTeams,
  getTeamById,
  addTeam,
  addTeamForm,
  updateTeamById,
  deteleTeamById,
};
