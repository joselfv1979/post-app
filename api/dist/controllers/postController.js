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
exports.deletePostController = exports.updatePostController = exports.createPostController = exports.getPostController = exports.getPostsController = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const mongodb_1 = require("mongodb");
const postService_1 = require("../services/postService");
function getPostsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const posts = yield (0, postService_1.getPostsService)();
            console.log(posts);
            res.json(posts);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getPostsController = getPostsController;
function getPostController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const post = yield (0, postService_1.getPostService)(new mongodb_1.ObjectId(id));
            console.log(post);
            res.json(post);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getPostController = getPostController;
function createPostController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req;
            const { content } = req.body;
            const user = yield User_1.default.findById(userId);
            if (!content) {
                return res.status(400).json({
                    error: 'required "content" field is missing',
                });
            }
            const newpost = new Post_1.default({
                content,
                created: new Date(),
                user: user._id
            });
            const response = yield (0, postService_1.createPostService)(newpost);
            user.posts = user.posts.concat(response._id);
            yield user.save();
            res.json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createPostController = createPostController;
function updatePostController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const post = yield (0, postService_1.updatePostService)(new mongodb_1.ObjectId(id), req.body);
            // return post
            //   ? res.json(post)
            //   : res.json({ status: 404, message: "Post not found" });
            res.json(post);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updatePostController = updatePostController;
function deletePostController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const post = yield (0, postService_1.deletePostService)(new mongodb_1.ObjectId(id));
            console.log(post);
            // return post
            //   ? res.status(204).end()
            //   : res.json({ status: 404, message: "Post not found" });
            res.status(204).end();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deletePostController = deletePostController;
//# sourceMappingURL=postController.js.map