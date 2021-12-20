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
exports.loginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginService_1 = require("../services/loginService");
const error_model_1 = require("../error-handler/error-model");
function loginController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { body } = req;
            const { username, password } = body;
            const user = yield (0, loginService_1.getUserService)(username);
            const passwordCorrect = user === null ? false : yield bcrypt_1.default.compare(password, user.passwordHash);
            if (!user || !passwordCorrect) {
                throw new error_model_1.ErrorModel(401, "Unauthenticated");
            }
            const userForToken = {
                id: user.id,
                username: user.username,
            };
            const token = jsonwebtoken_1.default.sign(userForToken, process.env.SECRET, {
                expiresIn: 60 * 60 * 24 * 7,
            });
            res.send({
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
                token,
            });
        }
        catch (error) {
            next(new error_model_1.ErrorModel(401, "Unauthenticated"));
        }
    });
}
exports.loginController = loginController;
//# sourceMappingURL=loginController.js.map