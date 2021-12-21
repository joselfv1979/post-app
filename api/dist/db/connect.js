"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};
const connectionString = process.env.NODE_ENV === 'test'
    ? process.env.MONGO_DB_URI_TEST
    : process.env.MONGO_DB_URI;
if (!connectionString) {
    console.log('UUUUURRRRRIIIIII', MONGO_DB_URI);
    console.error('Remember to have environment variables on a  file .env');
}
//connection mongodb atlas
const connect = () => {
    mongoose_1.default
        .connect(connectionString, options)
        .then(() => console.log("Database connected!"))
        .catch((err) => console.log(err));
};
exports.connect = connect;
process.on('uncaughtException', error => {
    console.error(error);
    mongoose_1.default.disconnect();
});
//# sourceMappingURL=connect.js.map