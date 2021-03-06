import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import { ErrorModel } from "../models/ErrorModel";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

import {
  getUserService,
  getUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../services/userService";


export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (error) {
    next(new ErrorModel(404, "Users not found"));
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
    res.json(data);
  } catch (error) {
    next(new ErrorModel(404, "User not found"));
  }
}

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, username, email, password, role } = req.body;

    if (!name || !username || !email || !password || !role) {
      throw new ErrorModel(400, "Bad request");
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
    res.status(201).json(response);
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
      throw new ErrorModel(400, "Bad request");
    }
    const user = await updateUserService(new ObjectId(id), req.body);

    res.status(201).json(user);
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
    await deleteUserService(new ObjectId(id));
    
    res.status(204).end();
  } catch (error) {
    next(new ErrorModel(404, "User not found"));
  }
}
