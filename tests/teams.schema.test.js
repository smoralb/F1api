var assert = require("chai").assert;
var Team = require("../src/models/teams");

describe("Teams schema", () => {
  it("should be invalid if team is empty", (done) => {
    var team = new Team();

    team.validate((err) => {
      console.log(team);
      console.log(err.message);
      assert.isNotEmpty(err.message);
      assert.notExists(team.name);
      assert.notExists(team.color);
      done();
    });
  });
  it("should be invalid if name is empty", (done) => {
    var team = new Team({ name: "" });

    team.validate((err) => {
      console.log(team);
      console.log(err.message);
      assert.isNotEmpty(err.message);
      assert.notExists(team.color);
      assert.empty(team.name);
      done();
    });
  });
  it("should be invalid if color is empty", (done) => {
    var team = new Team({ color: "" });

    team.validate(function (err) {
      console.log(team);
      console.log(err.message);
      assert.isNotEmpty(err.message);
      assert.notExists(team.name);
      assert.empty(team.color);
      done();
    });
  });
});
