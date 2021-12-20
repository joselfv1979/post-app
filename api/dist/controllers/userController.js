"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserController = exports.getUsersController = void 0;
const User_1 = __importDefault(require("../models/User"));
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = require("../services/userService");
const error_model_1 = require("../error-handler/error-model");
function getUsersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, userService_1.getUsersService)();
            console.log(users);
            res.json(users);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getUsersController = getUsersController;
function getUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, userService_1.getUserService)(new mongodb_1.ObjectId(id));
            console.log({ data });
            res.json(data);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getUserController = getUserController;
function createUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { name, username, email, password, role } = req.body;
            if (!name || !username || !email || !password || !role) {
                throw new error_model_1.ErrorModel(404, "Bad request");
            }
            const SaltRounds = 10;
            const passwordHash = yield bcrypt_1.default.hash(password, SaltRounds);
            const newuser = new User_1.default({
                name,
                username,
                email,
                passwordHash,
                role,
            });
            const response = yield (0, userService_1.createUserService)(newuser);
            res.json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createUserController = createUserController;
function updateUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name, username, email } = req.body;
            if (!name || !username || !email) {
                throw new error_model_1.ErrorModel(404, "Bad request");
            }
            const user = yield (0, userService_1.updateUserService)(new mongodb_1.ObjectId(id), req.body);
            // return user
            //   ? res.json(user)
            //   : res.json({ status: 404, message: "User not found" });
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateUserController = updateUserController;
function deleteUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield (0, userService_1.deleteUserService)(new mongodb_1.ObjectId(id));
            console.log(user);
            // return user
            //   ? res.status(204).end()
            //   : res.json({ status: 404, message: "User not found" });
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteUserController = deleteUserController;
//# sourceMappingURL=userController.js.map