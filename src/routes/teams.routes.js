const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teams.controllers");

router.get("/", teamsController.getTeams);

router.get("/:id", teamsController.getTeamById);

router.get("/form", teamsController.addTeamForm);

router.post("/addTeam", teamsController.addTeam);

router.put("/update/:id", teamsController.updateTeamById);

router.delete("/delete/:id", teamsController.deteleTeamById);

module.exports = router;
