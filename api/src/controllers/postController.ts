import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middlewares/userExtractor";
import Post, { IPost } from "../models/Post";
import User, { IUser } from "../models/User";
import { ObjectId } from "mongodb";

import {
  getPostsService,
  getPostService,
  createPostService,
  updatePostService,
  deletePostService,
} from "../services/postService";

import { ErrorModel } from "../models/ErrorModel";

export async function getPostsController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req;
    const posts = await getPostsService(userId);
    res.json(posts);
  } catch (error) {
    next(error);
  }
}

export async function getPostController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const post = await getPostService(new ObjectId(id));
    console.log(post);
    res.json(post);
  } catch (error) {
    next(error);
  }
}

export async function createPostController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req;
    console.log({ userId });

    const { content, created } = req.body;

    const user = await User.findById(userId);

    if (!content) {
      throw new ErrorModel(404, "Bad Request");
    }

    const newpost: IPost = new Post({
      content,
      created,
      user: user._id,
    });

    const response = await createPostService(newpost);

    user.posts = user.posts.concat(response._id);
    await user.save();

    res.json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function updatePostController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const post = await updatePostService(new ObjectId(id), req.body);
    res.json(post);
  } catch (error) {
    next(error);
  }
}

export async function deletePostController(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req;
    const { id } = req.params;

    const user = await User.findById({"_id" : userId});
    
    await deletePostService(new ObjectId(id));

    user.posts = user.posts.filter(post => post._id.toString() !== id);

    await user.save();

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
