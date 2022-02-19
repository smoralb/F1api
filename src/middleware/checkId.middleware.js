const Team = require("../models/teams");

module.exports = function (req, res, next) {
  Team.findById(req.params.id)
    .then((result) => {
      if (result) {
        req.team = result;
        next();
      } else res.status(404).json({ message: "Id not found" });
    })
    .catch((error) => res.status(400).json({ message: error.message }));
};
