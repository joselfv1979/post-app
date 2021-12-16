import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserService } from "../services/loginService";
import { ErrorModel } from "../error-handler/error-model";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;

    const { username, password } = body;
    const user = await getUserService(username);

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!user || !passwordCorrect) {
      throw new ErrorModel(401, "Unauthenticated");
    }

    const userForToken = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7,
    });

    res.send({
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (error) {
    next(new ErrorModel(401, "Unauthenticated"));
  }
}
