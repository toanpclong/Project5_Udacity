import { app } from "../server";
const request = require("supertest");
describe("Testing the submit functionality", () => {
  test("Testing the get api function GEONAMES_API_KEY", async (done) => {
    const res = await request(app).get("/get");
    expect(res.statusCode).toBe(200);
    expect(res.body.GEONAMES_API_KEY).toBe(process.env.GEONAMES_API_KEY);
    done();
  });
  test("Testing the get api function WEATHERBIT_API_KEY", async (done) => {
    const res = await request(app).get("/get");
    expect(res.body.WEATHERBIT_API_KEY).toBe(process.env.WEATHERBIT_API_KEY);
    done();
  });
  test("Testing the get api function PIXA_BAY_API_KEY", async (done) => {
    const res = await request(app).get("/get");
    expect(res.body.PIXA_BAY_API_KEY).toBe(process.env.PIXA_BAY_API_KEY);
    done();
  });
});
