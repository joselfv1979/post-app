import { Router } from "express";

import {
  getPostController,
  getPostsController,
  createPostController,
  updatePostController,
  deletePostController
} from "../controllers/postController";

const userExtractor = require('../middlewares/userExtractor');

const postsRouter = Router();

postsRouter.get("/", userExtractor, getPostsController);
postsRouter.get("/:id", userExtractor, getPostController);
postsRouter.post("/", userExtractor, createPostController);
postsRouter.put('/:id', userExtractor, updatePostController);
postsRouter.delete('/:id', userExtractor, deletePostController)
  
export default postsRouter;