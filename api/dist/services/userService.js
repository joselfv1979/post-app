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
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserService = exports.getUsersService = void 0;
const User_1 = __importDefault(require("../models/User"));
function getUsersService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("searching");
            return yield User_1.default.find().populate('posts', {
                content: 1,
                created: 1
            });
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.getUsersService = getUsersService;
function getUserService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield User_1.default.findById(id);
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.getUserService = getUserService;
function createUserService(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const savedUser = yield user.save();
            return savedUser;
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.createUserService = createUserService;
function updateUserService(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield User_1.default.findByIdAndUpdate(id, user, { new: true });
            return response;
        }
        catch (error) {
            console.log(error);
            throw Error(error);
        }
    });
}
exports.updateUserService = updateUserService;
function deleteUserService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield User_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.deleteUserService = deleteUserService;
//# sourceMappingURL=userService.js.map