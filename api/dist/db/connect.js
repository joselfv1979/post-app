"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};
//connection mongodb atlas
const connect = () => {
    mongoose_1.default
        .connect(process.env.MONGO_DB_URI, options)
        .then(() => console.log("Database connected!"))
        .catch((err) => console.log(err));
};
exports.connect = connect;
process.on('uncaughtException', error => {
    console.error(error);
    mongoose_1.default.disconnect();
});
//# sourceMappingURL=connect.js.map