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
exports.createAdminUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
function createAdminUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adminUser = yield User_1.default.findOne({ username: "admin" });
            if (adminUser) {
                return;
            }
            else {
                const passwordHash = yield bcrypt_1.default.hash("1234", 10);
                const admin = new User_1.default({
                    name: "admin",
                    username: "admin",
                    email: "admin@gmail.com",
                    passwordHash,
                    role: "admin",
                });
                yield admin.save();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createAdminUser = createAdminUser;
//# sourceMappingURL=createAdmin.js.map