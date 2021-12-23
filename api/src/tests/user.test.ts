import request from "supertest";
import server from "../server";
import mongoose from "mongoose";
import User, { IUser } from "../models/User";

const api = request(server);

interface AuthRequest {
  username: string;
  password: string;
}

const loginUser = async (user: AuthRequest) => {
  return await api.post("/api/login").send(user);
};

describe("Creating a new user", () => {
  it("should be created successfully & return 201 with a valid user", async () => {
    const usersAtStart = await api.get("/api/users");

    const newUser = {
      name: "John",
      username: "john",
      email: "john@gmail.com",
      password: "1234",
      role: "user",
    };

    await api.post("/api/users").send(newUser).expect(201);

    const usersAtEnd = await api.get("/api/users");
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1);

    const usernames = usersAtEnd.body.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  it("should return 400 & error response without username field", async () => {
    const newUser = {
      name: "john",
      email: "john@gmail.com",
      password: "1234",
      role: "user",
    };
    const res = await api.post("/api/users").send(newUser);
    expect(res.status).toBe(400);
    expect(res.error.text).toBe("Bad request");
  });
});

describe("Checking login endpoint", () => {
  it("should return 200 & token if user's credentials are correct", async () => {
    const user = { username: "john", password: "1234" };

    const res = await api.post("/api/login").send(user);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("POST /login should return 401 if user's credentials are incorrect", async () => {
    const user = { username: "john", password: "1111" };

    const res = await api.post("/api/login").send(user);
    expect(res.status).toBe(401);
    expect(res.error.text).toBe("Unauthenticated");
  });
});

describe("Deleting a user", () => {
  const user = { username: "john", password: "1234" };
  // let res: Promise<IUser> = null;
  // beforeEach(async () => {
  //   res = await loginUser(user);
  // })

  it("should return 404 if user doesn't exist", async () => {
    const res = await loginUser(user);
    console.log(typeof res);  
    const deleteRes = await api
      .delete("/api/users/123")
      .set("Authorization", "bearer " + res.body.token);
    expect(deleteRes.status).toBe(404);
    expect(deleteRes.error.text).toBe("User not found");
  });

  it("it should be deleted & return 204 if users exists", async () => {
    const res = await loginUser(user);
    const deleteRes = await api
      .delete(`/api/users/${res.body.id}`)
      .set("Authorization", "bearer " + res.body.token);
    expect(deleteRes.status).toBe(204);
  });
});

afterAll(async () => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  server.close();
});
