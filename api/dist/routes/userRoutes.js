"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", userController_1.getUsersController);
usersRouter.get("/:id", userController_1.getUserController);
usersRouter.post("/", userController_1.createUserController);
usersRouter.put('/:id', userController_1.updateUserController);
usersRouter.delete('/:id', userController_1.deleteUserController);
exports.default = usersRouter;
//# sourceMappingURL=userRoutes.js.map