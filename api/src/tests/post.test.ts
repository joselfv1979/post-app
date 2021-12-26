import request from "supertest";
import server from "../server";
import mongoose from "mongoose";
import Post from "../models/Post";
import { getInitialPosts, getUser, loginUser, AuthResponse } from "./helpers";

const api = request(server);

const user = { username: "mary", password: "1234" };
let loggedUser: AuthResponse;
let token: string;

beforeAll(async () => {
  await getUser();
  loggedUser = await loginUser(user);
  token = loggedUser.body.token;
  await Post.deleteMany({});
  await getInitialPosts(token);
});

describe("GET all posts", () => {
  it("posts are returned as json", async () => {
    await api
      .get("/api/posts")
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("Creating a new post", () => {
  it("should be created successfully & return 201 with a valid user", async () => {
    const newPost = {
      content: "last created post",
      created: new Date(),
    };
    const { body, status } = await api
      .post("/api/posts")
      .send(newPost)
      .set("Authorization", `bearer ${token}`);
    expect(status).toBe(201);
    expect(body.content).toBe("last created post");
  });

  it("is not possible without content", async () => {
    const newPost = { created: new Date() };
    const createdPost = await api
      .post("/api/posts")
      .send(newPost)
      .set("Authorization", `bearer ${token}`);
    expect(createdPost.status).toBe(400);
    expect(createdPost.error.text).toBe("Bad Request");
  });
});

describe("Deleting a post", () => {
  it("should be removed successfully & return 200", async () => {
    const posts = await api
      .get("/api/posts")
      .set("Authorization", `bearer ${token}`);

    const postToDelete = posts.body[0];

    const res = await api
      .delete(`/api/posts/${postToDelete.id}`)
      .set("Authorization", `bearer ${token}`);
    expect(res.status).toBe(204);
  });

  it("a post that do not exist can not be deleted", async () => {
    const res = await api
      .delete(`/api/posts/123`)
      .set("Authorization", `bearer ${token}`);
    expect(res.status).toBe(404);
  });
});

describe("Updating a post", () => {
  it("should be updated successfully & return 201", async () => {
    const posts = await api
      .get("/api/posts")
      .set("Authorization", `bearer ${token}`);

    const postDataToUpdate = {
      content: "content updated successfully",
    };

    const postToUpdate = posts.body[0];
    
    const { status, body } = await api
      .put(`/api/posts/${postToUpdate.id}`)
      .send(postDataToUpdate)
      .set("Authorization", `bearer ${token}`);
    expect(status).toBe(201);
    expect(body.content).toBe("content updated successfully");
  });
});

afterAll(async () => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  server.close();
});
