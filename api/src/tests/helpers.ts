import request from "supertest";
import server from "../server";
import User from "../models/User";
import Post from "../models/Post";

const api = request(server);

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  body: {
    id: string,
    username: string,
    token: string
  }
}

export const initialPosts = [
  {
    content: "First post",
    created: new Date(),
  },
  {
    content: "Second post",
    created: new Date(),
  },
  {
    content: "Third post",
    created: new Date(),
  },
];

export const loginUser = async (user: AuthRequest) => {
  return await api.post("/api/login").send(user);
};

export const getUser = async () => {
  const newUser = {
    name: "Mary",
    username: "mary",
    email: "mary@gmail.com",
    password: "1234",
    role: "user",
  };

  try {
    let user = await User.findOne({ username: "mary" });
    if (user) {
      return user;
    } else {
      user = await api.post("/api/users").send(newUser);
      return user;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getInitialPosts = async (token: string) => {
  for (const post of initialPosts) {
    await api
      .post("/api/posts")
      .send(post)
      .set("Authorization", `bearer ${token}`);
  }
};
