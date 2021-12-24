import { Router } from "express";

import {
  getUserController,
  getUsersController,
  createUserController,
  updateUserController,
  deleteUserController
} from "../controllers/userController";

const userExtractor = require('../middlewares/userExtractor');

const usersRouter = Router();

usersRouter.get("/", getUsersController);
usersRouter.get("/:id", userExtractor, getUserController);
usersRouter.post("/", createUserController);
usersRouter.put('/:id', userExtractor, updateUserController);
usersRouter.delete('/:id', userExtractor, deleteUserController);
  
export default usersRouter;