"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
module.exports = (request, response, next) => {
    const authorization = request.get('authorization');
    console.log({ authorization });
    let token = '';
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
    }
    catch (error) {
        console.error(error);
    }
    if (!token || !decodedToken) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }
    const { id: userId } = decodedToken;
    request.userId = userId;
    next();
};
//# sourceMappingURL=userExtractor.js.map