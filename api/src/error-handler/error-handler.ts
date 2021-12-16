import { Request, Response, NextFunction } from 'express';
import { ErrorModel } from './error-model';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error handling middleware called.');
  console.log('Path:', req.path);
  console.error('Error occured:', err);
  if (err instanceof ErrorModel) {
    console.log('Error is known.');
    console.log({err});   
    res.status(err.status).send(err.message);
  } else {
    // For unhandled errors.
    res.status(500).send({ message: "something went wrong" });
  }
};