import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export interface AuthRequest extends Request {
    userId: string;
}

module.exports = (request: AuthRequest, response: Response, next: NextFunction) => {
    const authorization = request.get('authorization');
    
    let token = '';

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.SECRET);
    } catch (error) {
        console.error(error);
    }

    if (!token || !decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid'});
    }

    const { id: userId} = decodedToken;
    
    request.userId = userId;

    next();
}