import request from "supertest";
import server from "../server";
import mongoose from "mongoose";
import User from "../models/User";

const api = request(server);

const getUsers = async () => {
  const users = await api.get("/api/users");
  return users;
};

beforeAll((done) => {
  done();
});

describe("Creating a new user", () => {
  beforeEach(async () => {
    const res = await User.deleteMany({});
  });
  it("POST /user should create a new user successfully", async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      name: "John",
      username: "john",
      email: "john@gmail.com",
      password: "1234",
      role: "user",
    };
    await api.post("/api/users").send(newUser).expect(201);

    const usersAtEnd = await getUsers();

    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1);

    const usernames = usersAtEnd.body.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe("Checking log in endpoint", () => {
  it("POST /login should return 200 & token if request params are correct", async () => {
    const user = { username: "john", password: "1234" };

    const res = await api.post("/api/login").send(user);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("POST /login should return 401 if request params are incorrect", async () => {
    const user = { username: "john", password: "1111" };

    const res = await api.post("/api/login").send(user);
    expect(res.status).toBe(401);
    expect(res.error.text).toBe("Unauthenticated");
  });
});

afterAll(() => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  server.close();
});
