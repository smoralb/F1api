let chai = require("chai");
let chaiHttp = require("chai-http");
const assert = chai.assert;
const app = require("../app");

chai.use(chaiHttp);
const url = "http://localhost:3000";

describe("GET teams", () => {
  it("with no teams added", async () => {
    const result = await chai.request(app).get("/teams");
    console.log(result.body);
    assert.equal(result.statusCode, 200);
    assert.empty(result.body);
  });
});
