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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const api = (0, supertest_1.default)(server_1.default);
beforeAll((done) => {
    done();
});
describe("User Endpoints", () => {
    it("GET /user should show all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield api.get("/api/users");
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining("json"));
    }));
    it("POST /login should return 200 & token if request params are correct", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { username: "admin", password: "1234" };
        const res = yield api.post("/api/login").send(user);
        console.log("response", res.body);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
    }));
    it("POST /login should return 401 if request params are incorrect", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { username: "admin", password: "" };
        const res = yield api.post("/api/login").send(user);
        console.log("response", res.error);
        expect(res.status).toBe(401);
        expect(res.error.text).toBe("Unauthenticated");
    }));
});
afterAll(() => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose_1.default.connection.close();
    server_1.default.close();
});
//# sourceMappingURL=user.test.js.map