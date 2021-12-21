import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connect } from "./db/connect";
import usersRouter from "./routes/userRoutes";
import postsRouter from "./routes/postRoutes";
import loginRouter from "./routes/loginRoutes";
import { errorHandler } from "./error-handler/error-handler";
import { createAdminUser } from "./utils/createAdmin";

const PORT = Number(process.env.PORT);

if (!process.env.PORT) {
  process.exit(1);
}

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create admin app utility
createAdminUser();

app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/login", loginRouter);

app.use(errorHandler);

const server = app.listen(PORT || 3000, () => {
  console.log(`server is listening on ${PORT}`);
  connect();
});

export default server;
