import request from "supertest";
import server from "../server";
import mongoose from "mongoose";

const api = request(server);

interface AuthRequest {
  username: string;
  password: string;
}

const loginUser = async (user: AuthRequest) => {
  return await api.post("/api/login").send(user);
};

beforeAll(async () => {
  const user = {
    name: "Mary",
    username: "mary",
    email: "mary@gmail.com",
    password: "1234",
    role: "user",
  };
  await api.post("/api/users").send(user);
});

describe("Creating a new post", () => {
  const user = { username: "mary", password: "1234" };

  it("should be created successfully & return 201 with a valid user", async () => {
    const res = await loginUser(user);
    const newPost = {
      content: "first post",
      created: new Date(),
    };
    const createdPost = await api
      .post("/api/posts")
      .send(newPost)
      .set("Authorization", `bearer ${res.body.token}`);
    expect(createdPost.status).toBe(201);
    expect(createdPost.body.content).toBe("first post");
  });
});

afterAll(async () => {
  const res = await loginUser({ username: "mary", password: "1234" });
  await api
    .delete(`/api/users/${res.body.id}`)
    .set("Authorization", `bearer ${res.body.token}`);
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  server.close();
});
