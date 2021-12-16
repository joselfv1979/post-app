import { Router } from "express";

import {
  getUserController,
  getUsersController,
  createUserController,
  updateUserController,
  deleteUserController
} from "../controllers/userController";

const usersRouter = Router();

usersRouter.get("/", getUsersController);
usersRouter.get("/:id", getUserController);
usersRouter.post("/", createUserController);
usersRouter.put('/:id', updateUserController);
usersRouter.delete('/:id', deleteUserController);
  
export default usersRouter;