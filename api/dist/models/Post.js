"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    created: { type: Date, required: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
});
PostSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = (0, mongoose_1.model)("Post", PostSchema);
//# sourceMappingURL=Post.js.map