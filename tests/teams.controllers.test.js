let chai = require("chai");
let chaiHttp = require("chai-http");
const assert = chai.assert;
const app = require("../app");
const Team = require("../src/models/teams");

chai.use(chaiHttp);

beforeEach((done) => {
  Team.deleteMany({}, (err) => {
    done();
  });
});

describe("GET teams", () => {
  it("with no teams added", async () => {
    await chai
      .request(app)
      .get("/teams")
      .then((result) => {
        assert.equal(result.statusCode, 200);
        console.log(result.body);
        assert.isEmpty(result.body);
      })
      .catch((err) => console.error(err));
  });
  it("with teams added", () => {
    let team = new Team({ name: "Test", color: "Test" });
    team.save(async (err, team) => {
      await chai
        .request(app)
        .get("/teams")
        .send(team)
        .then((result) => {
          assert.equal(result.statusCode, 200);
          console.log(result.body);
        })
        .catch((err) => console.error(err));
    });
  });
  it("get team by id", () => {
    let team = new Team({ name: "Test", color: "Test" });
    team.save(async (err, team) => {
      await chai
        .request(app)
        .get("/teams/" + team.id)
        .send(team)
        .then((res) => {
          assert.equal(res.statusCode, 200);
        });
    });
  });
});

describe("POST teams", () => {
  it("send team in the request body", async () => {
    let team = new Team({ name: "Test", color: "Test" });
    await chai
      .request(app)
      .post("/teams/addTeam")
      .send(team)
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
      });
  });
});

describe("PUT teams", () => {
  it("update by id", async () => {
    let team = new Team({ name: "Test", color: "Test" });
    let teamUpdated = new Team({ name: "Test 2", color: "Test 2" });
    await team.save((err, team) => {
      chai
        .request(app)
        .put("/teams/update/" + team.id)
        .set("content-type", "application/json")
        .send(teamUpdated)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.name, teamUpdated.name);
          assert.equal(res.body.color, teamUpdated.color);
        });
    });
  });
});
