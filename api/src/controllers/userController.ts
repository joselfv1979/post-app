import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

import {
  getUserService,
  getUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../services/userService";

import { ErrorModel } from "../error-handler/error-model";

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getUsersService();
    console.log(users);
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = await getUserService(new ObjectId(id));
    console.log({ data });
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body);
    const { name, username, email, password, role } = req.body;
    
    if(!name || !username || !email || !password || !role) {
      throw new ErrorModel(404, "Bad request");
    }
    
    const SaltRounds = 10;
    const passwordHash = await bcrypt.hash(password, SaltRounds);
    const newuser: IUser = new User({
      name,
      username,
      email,
      passwordHash,
      role,
    });
    const response = await createUserService(newuser);
    res.json(response);
  } catch (error) {
    next(error);
  }
}

export async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { name, username, email } = req.body;
    if (!name || !username || !email) {
      throw new ErrorModel(404, "Bad request");
    }
    const user = await updateUserService(new ObjectId(id), req.body);
    // return user
    //   ? res.json(user)
    //   : res.json({ status: 404, message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = await deleteUserService(new ObjectId(id));
    console.log(user);
    // return user
    //   ? res.status(204).end()
    //   : res.json({ status: 404, message: "User not found" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
