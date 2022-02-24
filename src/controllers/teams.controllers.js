var ObjectId = require("mongodb").ObjectId;
const Team = require("../models/teams");

const getTeams = (req, res) => {
  Team.find()
    .exec()
    .then((result) => res.send(result))
    .catch((error) => {
      res.status(error.code).json({ message: error.message });
    });
};

const getTeamById = (req, res) => {
  Team.findById(ObjectId(req.team.id))
    .then((result) => res.send(result))
    .catch((error) => {
      res.status(error.code).json({ message: error.message });
    });
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
    .catch((error) => {
      res.status(error.code).json({ message: error.message });
    });
};

const updateTeamById = (req, res) => {
  Team.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { name: req.body.name, color: req.body.color } }
  )
    .then((result) => {
      if (result.modifedCount == 0) {
        res.status(410).json({ message: "Item could not be modified" });
      } else res.send(result);
    })
    .catch((error) => {
      res.status(error.code).json({ message: error.message });
    });
};

const deteleTeamById = (req, res) => {
  Team.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount == 0) {
        res.status(410).json({ message: "This item is already deleted" });
      } else res.status(204);
    })
    .catch((error) => {
      res.status(error.code).json({ message: error.message });
    });
};

module.exports = {
  getTeams,
  getTeamById,
  addTeam,
  addTeamForm,
  updateTeamById,
  deteleTeamById,
};
