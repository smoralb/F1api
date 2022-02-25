let chai = require("chai");
let chaiHttp = require("chai-http");
const assert = chai.assert;
const should = chai.should;
const have = chai.have;
const app = require("../app");
const Team = require("../src/models/teams");

chai.use(chaiHttp);

describe("GET teams", () => {
  beforeEach((done) => {
    Team.deleteMany({}, (err) => {
      done();
    });
  });
  it("with no teams added", async () => {
    const result = await chai.request(app).get("/teams");
    assert.equal(result.statusCode, 200);
    assert.empty(result.body);
  });
  it("with teams added", () => {
    let team = new Team({ name: "Mercedes", color: "Blue" });
    team.save(async (err, team) => {
      await chai
        .request(app)
        .get("/teams")
        .send(team)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.isNotEmpty(res.body);
        });
    });
  });
  it("get team by id", () => {
    let team = new Team({ name: "Test", color: "test" });
    team.save(async (err, team) => {
      await chai
        .request(app)
        .get("/teams/" + team.id)
        .send(team)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.isNotEmpty(res.body);
        });
    });
  });
});

describe("POST teams", () => {
  beforeEach((done) => {
    Team.deleteMany({}, (err) => {
      done();
    });
  });
  it("send team in the request body", (done) => {
    chai
      .request(app)
      .post("/teams/addTeam")
      .send({ name: "Test", color: "Test" })
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.isNotEmpty(res.body);
        assert.equal(res.body.name, "Test");
        assert.equal(res.body.color, "Test");
        assert.isNotEmpty(res.body);
        done();
      });
  });
});
