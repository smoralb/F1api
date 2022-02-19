const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teams.controllers");
const validateId = require("../middleware/checkId.middleware");

router.get("/", teamsController.getTeams);

router.get("/:id", validateId, teamsController.getTeamById);

router.get("/form", teamsController.addTeamForm);

router.post("/addTeam", teamsController.addTeam);

router.put("/update/:id", validateId, teamsController.updateTeamById);

router.delete("/delete/:id", validateId, teamsController.deteleTeamById);

module.exports = router;
