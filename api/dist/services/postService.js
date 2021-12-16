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
exports.deletePostService = exports.updatePostService = exports.createPostService = exports.getPostService = exports.getPostsService = void 0;
const Post_1 = __importDefault(require("../models/Post"));
function getPostsService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("searching");
            return yield Post_1.default.find().populate("user", {
                username: 1,
                name: 1,
            });
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.getPostsService = getPostsService;
function getPostService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Post_1.default.findById(id);
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.getPostService = getPostService;
function createPostService(post) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const savedPost = yield post.save();
            return savedPost;
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.createPostService = createPostService;
function updatePostService(id, post) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield Post_1.default.findByIdAndUpdate(id, post, { new: true });
            return response;
        }
        catch (error) {
            console.log(error);
            throw Error(error);
        }
    });
}
exports.updatePostService = updatePostService;
function deletePostService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield Post_1.default.findByIdAndDelete(id);
        }
        catch (error) {
            throw Error(error);
        }
    });
}
exports.deletePostService = deletePostService;
//# sourceMappingURL=postService.js.map