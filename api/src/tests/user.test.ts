import request from "supertest";
import server from "../server";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User";
const api = request(server);

beforeAll((done) => {
  done();
});

describe("User Endpoints", () => {
  it("GET /user should show all users", async () => {
    const res = await api.get("/api/users");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("POST /login should return 200 & token if request params are correct", async () => {
    const user = { username: "admin", password: "1234" };

    const res = await api.post("/api/login").send(user);
    console.log("response", res.body);    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("POST /login should return 401 if request params are incorrect", async () => {
    const user = { username: "admin", password: "" };

    const res = await api.post("/api/login").send(user);
    console.log("response", res.error);  
    expect(res.status).toBe(401);
    expect(res.error.text).toBe("Unauthenticated");
  });
});

afterAll(() => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  server.close();
});
