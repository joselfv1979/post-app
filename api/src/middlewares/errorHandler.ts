import { Request, Response, NextFunction } from 'express';
import { ErrorModel } from '../models/ErrorModel';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error handling middleware called.');
  console.log('Path:', req.path);
  console.log(err);
  if (err instanceof ErrorModel) { 
    res.status(err.status).send(err.message);
  } else {
    // For unhandled errors.
    res.status(500).send({ message: "something went wrong" });
  }
};