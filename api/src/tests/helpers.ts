import request from "supertest";
import server from "../server";
import User from "../models/User";

const api = request(server);

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
