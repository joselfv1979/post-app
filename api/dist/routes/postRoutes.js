"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const userExtractor = require('../middlewares/userExtractor');
const postsRouter = (0, express_1.Router)();
postsRouter.get("/", postController_1.getPostsController);
postsRouter.get("/:id", postController_1.getPostController);
postsRouter.post("/", userExtractor, postController_1.createPostController);
postsRouter.put('/:id', userExtractor, postController_1.updatePostController);
postsRouter.delete('/:id', userExtractor, postController_1.deletePostController);
exports.default = postsRouter;
//# sourceMappingURL=postRoutes.js.map