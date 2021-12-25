import request from "supertest";
import server from "../server";
import mongoose from "mongoose";
import Post from "../models/Post";
import { initialPosts, getUser } from "./helpers";

const api = request(server);

interface AuthRequest {
  username: string;
  password: string;
}

const user = { username: "mary", password: "1234" };

const loginUser = async (user: AuthRequest) => {
  return await api.post("/api/login").send(user);
};

beforeAll(async () => {
  await getUser();
  await Post.deleteMany({});
  for (const post of initialPosts) {
    const postObject = new Post(post);
    await postObject.save();
  }
});

describe("GET all posts", () => {
  it("posts are returned as json", async () => {
    const res = await loginUser(user);
    await api
      .get("/api/posts")
      .set("Authorization", `bearer ${res.body.token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("Creating a new post", () => {

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
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  server.close();
});
