"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_model_1 = require("./error-model");
const errorHandler = (err, req, res, next) => {
    console.log('Error handling middleware called.');
    console.log('Path:', req.path);
    console.error('Error occured:', err);
    if (err instanceof error_model_1.ErrorModel) {
        console.log('Error is known.');
        console.log({ err });
        res.status(err.status).send(err.message);
    }
    else {
        // For unhandled errors.
        res.status(500).send({ message: "something went wrong" });
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map